package it.listamateriale.app

import android.annotation.SuppressLint
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.pdf.PdfDocument
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.provider.MediaStore
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.FileProvider
import java.io.File
import java.io.FileOutputStream
import kotlin.math.ceil
import android.os.Build
import android.provider.Settings
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : ComponentActivity() {

    private lateinit var root: FrameLayout
    private lateinit var web: WebView
    private var pdfView: WebView? = null
    private var pdfName = "Richiesta.pdf"
    private val ui = Handler(Looper.getMainLooper())

    // ---------- scelta file / foto per <input type=file> ----------
    private var fileCb: ValueCallback<Array<Uri>>? = null
    private var cameraUri: Uri? = null
    private var cameraFile: File? = null
    private val chooser = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { res ->
        var out: Array<Uri>? = null
        if (res.resultCode == RESULT_OK) {
            val picked = res.data?.data
            out = when {
                picked != null -> arrayOf(picked)
                cameraFile?.let { it.exists() && it.length() > 0 } == true -> arrayOf(cameraUri!!)
                else -> null
            }
        }
        fileCb?.onReceiveValue(out)
        fileCb = null
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        // Necessario per disegnare l'intero documento nel PDF, non solo la parte visibile
        WebView.enableSlowWholeDocumentDraw()
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.parseColor("#1F4FD8")
        if (genuine() == false) { notGenuine(); return }

        root = FrameLayout(this)
        web = WebView(this)
        web.settings.javaScriptEnabled = true
        web.settings.domStorageEnabled = true
        web.settings.allowFileAccess = true
        web.addJavascriptInterface(Bridge(), "Android")
        web.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, req: WebResourceRequest): Boolean {
                val u = req.url
                if (u.scheme == "file") return false
                openExternal(u)
                return true
            }
        }
        web.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(view: WebView, cb: ValueCallback<Array<Uri>>, params: FileChooserParams): Boolean {
                fileCb?.onReceiveValue(null)
                fileCb = cb
                val image = params.acceptTypes.any { it.startsWith("image") }
                val pick = Intent(Intent.ACTION_GET_CONTENT)
                    .addCategory(Intent.CATEGORY_OPENABLE)
                    .setType(if (image) "image/*" else "*/*")
                val ch = Intent.createChooser(pick, if (image) "Foto" else "File")
                cameraFile = null
                if (image) {
                    try {
                        val dir = File(cacheDir, "photos").apply { mkdirs() }
                        val f = File(dir, "camera.jpg"); f.delete()
                        cameraFile = f
                        cameraUri = FileProvider.getUriForFile(this@MainActivity, "$packageName.files", f)
                        val cam = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                            .putExtra(MediaStore.EXTRA_OUTPUT, cameraUri)
                            .addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION or Intent.FLAG_GRANT_READ_URI_PERMISSION)
                        ch.putExtra(Intent.EXTRA_INITIAL_INTENTS, arrayOf(cam))
                    } catch (_: Exception) { }
                }
                return try { chooser.launch(ch); true } catch (_: Exception) { fileCb = null; false }
            }
        }
        root.addView(web, FrameLayout.LayoutParams(-1, -1))
        setContentView(root)
        web.loadUrl(startUrl())

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                web.evaluateJavascript("window.appBack&&window.appBack()") { r ->
                    if (r != "true") finish()
                }
            }
        })
    }

    override fun onPause() {
        super.onPause()
        if (::web.isInitialized) web.evaluateJavascript("window.lmPause&&window.lmPause()", null)
    }

    override fun onResume() {
        super.onResume()
        if (::web.isInitialized) web.evaluateJavascript("window.lmResume&&window.lmResume()", null)
        // tornato dalle impostazioni dopo aver dato il permesso: riprende l'installazione
        if (updWaitingPermission && Build.VERSION.SDK_INT >= 26 && packageManager.canRequestPackageInstalls()) {
            updWaitingPermission = false
            installUpdate()
        }
    }

    // ---------- aggiornamento in-app ----------
    private var updFile: File? = null
    private var updDownloading = false
    private var updWaitingPermission = false

    private fun js(code: String) = ui.post { web.evaluateJavascript(code, null) }

    private fun downloadUpdate(url: String) {
        if (updDownloading) return
        updDownloading = true
        Thread {
            try {
                val dir = File(cacheDir, "update").apply { mkdirs() }
                dir.listFiles()?.forEach { it.delete() }
                val f = File(dir, "update.apk")
                var u = URL(url)
                var c = u.openConnection() as HttpURLConnection
                c.instanceFollowRedirects = true
                c.connectTimeout = 15000; c.readTimeout = 30000
                val total = c.contentLengthLong
                c.inputStream.use { inp ->
                    FileOutputStream(f).use { out ->
                        val buf = ByteArray(32 * 1024)
                        var done = 0L; var last = -1
                        while (true) {
                            val n = inp.read(buf); if (n < 0) break
                            out.write(buf, 0, n); done += n
                            if (total > 0) { val p = (done * 100 / total).toInt(); if (p != last) { last = p; js("window.onUpdProgress&&window.onUpdProgress($p)") } }
                        }
                    }
                }
                c.disconnect()
                updFile = f
                updDownloading = false
                ui.post { installUpdate() }
            } catch (e: Exception) {
                updDownloading = false
                js("window.onUpdError&&window.onUpdError()")
            }
        }.start()
    }

    private fun installUpdate() {
        val f = updFile ?: return
        if (Build.VERSION.SDK_INT >= 26 && !packageManager.canRequestPackageInstalls()) {
            // l'utente deve permettere a questa app di installare aggiornamenti (una sola volta)
            updWaitingPermission = true
            js("window.onUpdNeedPermission&&window.onUpdNeedPermission()")
            try {
                startActivity(Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:$packageName")))
            } catch (_: Exception) { }
            return
        }
        try {
            val uri = FileProvider.getUriForFile(this, "$packageName.files", f)
            val i = Intent(Intent.ACTION_VIEW)
                .setDataAndType(uri, "application/vnd.android.package-archive")
                .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(i)
            js("window.onUpdInstalling&&window.onUpdInstalling()")
        } catch (e: Exception) {
            js("window.onUpdError&&window.onUpdError()")
        }
    }

    private fun openExternal(u: Uri) {
        val i = if (u.scheme == "tel") Intent(Intent.ACTION_DIAL, u) else Intent(Intent.ACTION_VIEW, u)
        try { startActivity(i) } catch (_: Exception) {}
    }

    // ---------- protezione: l'APK deve essere firmato con la nostra chiave ----------
    // Se qualcuno modifica e rifirma l'app, l'impronta del certificato cambia e l'app non parte.
    private fun genuine(): Boolean? = try {
        val certs: Array<android.content.pm.Signature>? = if (Build.VERSION.SDK_INT >= 28) {
            val info = packageManager.getPackageInfo(packageName, android.content.pm.PackageManager.GET_SIGNING_CERTIFICATES).signingInfo
            if (info == null) null else if (info.hasMultipleSigners()) info.apkContentsSigners else info.signingCertificateHistory
        } else {
            @Suppress("DEPRECATION")
            packageManager.getPackageInfo(packageName, android.content.pm.PackageManager.GET_SIGNATURES).signatures
        }
        if (certs == null || certs.isEmpty()) null else {
            val want = listOf("8CC7375853DC662F", "030F5AA1297AFD10", "76A0E445621E425C", "FFD9EAD682135295").joinToString("")
            val md = java.security.MessageDigest.getInstance("SHA-256")
            certs.any { c -> md.digest(c.toByteArray()).joinToString("") { b -> "%02X".format(b) } == want }
        }
    } catch (e: Exception) { null }

    private fun notGenuine() {
        android.app.AlertDialog.Builder(this)
            .setTitle("⚠️ نسخة غير أصلية / Copia non originale")
            .setMessage("هذه النسخة من التطبيق معدّلة وغير أصلية. حمّل النسخة الأصلية.\n\nQuesta copia dell'app è stata modificata. Scarica l'app originale.")
            .setCancelable(false)
            .setPositiveButton("⬇️ Download") { _, _ ->
                try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://siteneeds.net/SiteNeeds.apk"))) } catch (_: Exception) {}
                finish()
            }
            .show()
    }

    // ---------- aggiornamento silenzioso: solo la parte web (html/js), firmata ----------
    // Il pacchetto viene scaricato in background, verificato (firma ECDSA + SHA-256) e usato dal prossimo avvio.
    // Se non parte (nessuna conferma liveOk entro 12 s) viene scartato e si torna alla versione interna.
    private val ASSET_URL = "file:///android_asset/index.html"
    private val LIVE_PUB = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEbZqC8tCafp0UGhNA04swKizQ2HNjqZJN4dsDQSPlIBD0J1UQdCh1ZO+7Dg+zsI/vHRVc6eErwc3fxrXyMbMByA=="
    private val liveRoot by lazy { File(filesDir, "live") }
    private var liveRunning = ""
    private var liveBusy = false

    private fun nativeCode(): Long = try {
        val pi = packageManager.getPackageInfo(packageName, 0)
        if (Build.VERSION.SDK_INT >= 28) pi.longVersionCode else @Suppress("DEPRECATION") pi.versionCode.toLong()
    } catch (_: Exception) { 0L }

    private fun liveState(): org.json.JSONObject = try {
        org.json.JSONObject(File(liveRoot, "state.json").readText())
    } catch (_: Exception) { org.json.JSONObject() }

    private fun saveLiveState(o: org.json.JSONObject) {
        try { liveRoot.mkdirs(); File(liveRoot, "state.json").writeText(o.toString()) } catch (_: Exception) {}
    }

    private fun isBad(st: org.json.JSONObject, ver: String): Boolean {
        val b = st.optJSONArray("bad") ?: return false
        for (i in 0 until b.length()) if (b.optString(i) == ver) return true
        return false
    }

    private fun markBad(ver: String) {
        val st = liveState()
        val b = st.optJSONArray("bad") ?: org.json.JSONArray()
        b.put(ver); st.put("bad", b); st.put("pending", ""); st.put("ready", "")
        saveLiveState(st)
        try { File(liveRoot, ver).deleteRecursively() } catch (_: Exception) {}
    }

    private fun startUrl(): String = try {
        val st = liveState()
        val ver = st.optString("ready", "")
        val idx = File(liveRoot, "$ver/index.html")
        when {
            ver.isEmpty() || !idx.exists() -> ASSET_URL
            (ver.toLongOrNull() ?: 0L) <= nativeCode() -> { st.put("ready", ""); saveLiveState(st); File(liveRoot, ver).deleteRecursively(); ASSET_URL }
            nativeCode() < st.optLong("min", Long.MAX_VALUE) || isBad(st, ver) -> ASSET_URL
            st.optString("pending", "") == ver -> { markBad(ver); ASSET_URL }   // l'ultima volta non è partito
            else -> {
                st.put("pending", ver); saveLiveState(st); liveRunning = ver
                ui.postDelayed({ if (liveRunning == ver && liveState().optString("pending") == ver) { markBad(ver); liveRunning = ""; web.loadUrl(ASSET_URL) } }, 12000)
                "file://" + idx.absolutePath
            }
        }
    } catch (_: Exception) { ASSET_URL }

    private fun sha256Hex(b: ByteArray): String =
        java.security.MessageDigest.getInstance("SHA-256").digest(b).joinToString("") { "%02x".format(it) }

    private fun liveFetch(json: String, base: String) {
        if (liveBusy) return
        liveBusy = true
        Thread {
            try {
                val o = org.json.JSONObject(json)
                val ver = o.getString("ver"); val min = o.getLong("min")
                val v = ver.toLongOrNull() ?: throw Exception("ver")
                val st = liveState()
                val have = maxOf(nativeCode(), st.optString("ready", "0").toLongOrNull() ?: 0L)
                if (v <= have || nativeCode() < min || isBad(st, ver)) { liveBusy = false; return@Thread }
                val files = o.getJSONObject("files")
                val names = files.keys().asSequence().toList().sorted()
                if (names.isEmpty() || names.any { !Regex("^[A-Za-z0-9._-]+$").matches(it) } || "index.html" !in names) throw Exception("names")
                val msg = "SN-LIVE\n$ver\n$min\n" + names.joinToString("") { it + "=" + files.getString(it) + "\n" }
                val key = java.security.KeyFactory.getInstance("EC").generatePublic(
                    java.security.spec.X509EncodedKeySpec(android.util.Base64.decode(LIVE_PUB, android.util.Base64.DEFAULT)))
                val sg = java.security.Signature.getInstance("SHA256withECDSA")
                sg.initVerify(key); sg.update(msg.toByteArray(Charsets.UTF_8))
                if (!sg.verify(android.util.Base64.decode(o.getString("sig"), android.util.Base64.DEFAULT))) throw Exception("sig")
                val tmp = File(liveRoot, "$ver.tmp"); tmp.deleteRecursively(); tmp.mkdirs()
                for (n in names) {
                    val c = URL(base + "live/" + ver + "/" + n).openConnection() as HttpURLConnection
                    c.instanceFollowRedirects = true; c.connectTimeout = 15000; c.readTimeout = 30000
                    val data = c.inputStream.use { it.readBytes() }; c.disconnect()
                    if (sha256Hex(data) != files.getString(n)) throw Exception("hash $n")
                    File(tmp, n).writeBytes(data)
                }
                val dst = File(liveRoot, ver); dst.deleteRecursively()
                if (!tmp.renameTo(dst)) throw Exception("rename")
                val st2 = liveState(); val old = st2.optString("ready", "")
                st2.put("ready", ver); st2.put("min", min); st2.put("pending", ""); saveLiveState(st2)
                liveRoot.listFiles()?.forEach { f -> if (f.isDirectory && f.name != ver && f.name != liveRunning) f.deleteRecursively() }
                if (old != ver) js("window.onLiveReady&&window.onLiveReady('$ver')")
            } catch (_: Exception) {
                try { liveRoot.listFiles()?.forEach { if (it.name.endsWith(".tmp")) it.deleteRecursively() } } catch (_: Exception) {}
            }
            liveBusy = false
        }.start()
    }

    inner class Bridge {
        @JavascriptInterface
        fun liveFetch(json: String, base: String) { this@MainActivity.liveFetch(json, base) }

        @JavascriptInterface
        fun liveOk(ver: String) {
            ui.post {
                if (liveRunning.isNotEmpty() && ver == liveRunning) {
                    val st = liveState(); st.put("pending", ""); st.put("ok", ver); saveLiveState(st)
                    liveRunning = ""
                }
            }
        }

        @JavascriptInterface
        fun liveVer(): String = liveState().optString("ok", "")

        @JavascriptInterface
        fun copy(text: String) {
            val cm = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
            cm.setPrimaryClip(ClipData.newPlainText("Richiesta materiale", text))
        }

        @JavascriptInterface
        fun whatsapp(text: String, number: String) {
            ui.post { sendWhatsapp(text, number) }
        }

        @JavascriptInterface
        fun shareText(text: String) {
            ui.post {
                val i = Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, text)
                startActivity(Intent.createChooser(i, "Invia"))
            }
        }

        @JavascriptInterface
        fun shareFile(name: String, content: String, mime: String) {
            ui.post {
                try {
                    val dir = File(cacheDir, "export").apply { mkdirs() }
                    dir.listFiles()?.forEach { it.delete() }
                    val f = File(dir, name)
                    f.writeText(content, Charsets.UTF_8)
                    val uri = FileProvider.getUriForFile(this@MainActivity, "$packageName.files", f)
                    val i = Intent(Intent.ACTION_SEND).setType(mime)
                        .putExtra(Intent.EXTRA_STREAM, uri)
                        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    startActivity(Intent.createChooser(i, name))
                } catch (_: Exception) { }
            }
        }

        @JavascriptInterface
        fun open(url: String) {
            ui.post { openExternal(Uri.parse(url)) }
        }

        @JavascriptInterface
        fun versionCode(): Long = try {
            val pi = packageManager.getPackageInfo(packageName, 0)
            if (Build.VERSION.SDK_INT >= 28) pi.longVersionCode else @Suppress("DEPRECATION") pi.versionCode.toLong()
        } catch (_: Exception) { 0L }

        @JavascriptInterface
        fun update(url: String) { downloadUpdate(url) }

        @JavascriptInterface
        fun version(): String = try {
            packageManager.getPackageInfo(packageName, 0).versionName ?: ""
        } catch (_: Exception) { "" }

        @JavascriptInterface
        fun pdf(html: String, name: String) {
            ui.post { makePdf(html, name) }
        }
    }

    private fun sendWhatsapp(text: String, number: String) {
        val pkgs = listOf("com.whatsapp", "com.whatsapp.w4b")
        for (p in pkgs) {
            try {
                val i = if (number.isNotEmpty()) {
                    Intent(Intent.ACTION_VIEW, Uri.parse("https://api.whatsapp.com/send?phone=$number&text=" + Uri.encode(text)))
                } else {
                    Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, text)
                }
                i.setPackage(p)
                startActivity(i)
                return
            } catch (_: Exception) { }
        }
        // WhatsApp non installato: scelta libera dell'app
        val i = Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, text)
        startActivity(Intent.createChooser(i, "Invia"))
    }

    // ---------- PDF ----------
    // Il report viene disegnato in una WebView larga 794 px CSS (A4), poi diviso in pagine.
    @SuppressLint("SetJavaScriptEnabled")
    private fun makePdf(html: String, name: String) {
        pdfName = name.ifBlank { "Richiesta.pdf" }
        pdfView?.let { root.removeView(it) }
        val d = resources.displayMetrics.density
        val w = (794 * d).toInt()
        val v = WebView(this)
        v.setLayerType(View.LAYER_TYPE_SOFTWARE, null)
        v.settings.javaScriptEnabled = true
        v.isVerticalScrollBarEnabled = false
        v.setBackgroundColor(Color.WHITE)
        v.addJavascriptInterface(ReportBridge(v, w), "Report")
        pdfView = v
        // aggiunta sotto la WebView principale: invisibile all'utente
        root.addView(v, 0, FrameLayout.LayoutParams(w, (w * 1.42f).toInt()))
        v.loadDataWithBaseURL("file:///android_asset/", html, "text/html", "utf-8", null)
        ui.postDelayed({ if (pdfView === v && !done) fail() }, 15000)
    }

    private var done = false

    inner class ReportBridge(private val v: WebView, private val w: Int) {
        init { done = false }

        @JavascriptInterface
        fun ready(cssHeight: Double, cssWidth: Double) {
            ui.post {
                val scale = w / cssWidth.coerceAtLeast(1.0)
                val totalPx = (cssHeight * scale).toInt() + 2
                v.layoutParams = FrameLayout.LayoutParams(w, totalPx)
                v.requestLayout()
                ui.postDelayed({ drawPdf(v, w, totalPx) }, 500)
            }
        }
    }

    private fun drawPdf(v: WebView, w: Int, totalPx: Int) {
        try {
            val pageW = 595
            val pageH = 842
            val pagePx = w * 297f / 210f
            val pages = ceil(totalPx / pagePx).toInt().coerceAtLeast(1)
            val doc = PdfDocument()
            val s = pageW.toFloat() / w
            for (i in 0 until pages) {
                val page = doc.startPage(PdfDocument.PageInfo.Builder(pageW, pageH, i + 1).create())
                val c = page.canvas
                c.drawColor(Color.WHITE)
                c.scale(s, s)
                c.translate(0f, -i * pagePx)
                c.clipRect(0f, i * pagePx, w.toFloat(), (i + 1) * pagePx)
                v.draw(c)
                doc.finishPage(page)
            }
            val dir = File(cacheDir, "pdf").apply { mkdirs() }
            dir.listFiles()?.forEach { it.delete() }
            val f = File(dir, pdfName)
            FileOutputStream(f).use { doc.writeTo(it) }
            doc.close()
            done = true
            root.removeView(v)
            pdfView = null
            web.evaluateJavascript("window.onPdfDone&&window.onPdfDone(true)", null)
            sharePdf(f)
        } catch (e: Exception) {
            fail()
        }
    }

    private fun fail() {
        pdfView?.let { root.removeView(it) }
        pdfView = null
        web.evaluateJavascript("window.onPdfDone&&window.onPdfDone(false)", null)
    }

    private fun sharePdf(f: File) {
        val uri = FileProvider.getUriForFile(this, "$packageName.files", f)
        val i = Intent(Intent.ACTION_SEND)
            .setType("application/pdf")
            .putExtra(Intent.EXTRA_STREAM, uri)
            .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        startActivity(Intent.createChooser(i, "Invia PDF"))
    }
}
