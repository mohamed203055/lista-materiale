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
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.core.content.FileProvider
import java.io.File
import java.io.FileOutputStream
import kotlin.math.ceil

class MainActivity : ComponentActivity() {

    private lateinit var root: FrameLayout
    private lateinit var web: WebView
    private var pdfView: WebView? = null
    private var pdfName = "Richiesta.pdf"
    private val ui = Handler(Looper.getMainLooper())

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        // Necessario per disegnare l'intero documento nel PDF, non solo la parte visibile
        WebView.enableSlowWholeDocumentDraw()
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.parseColor("#1F4FD8")

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
        root.addView(web, FrameLayout.LayoutParams(-1, -1))
        setContentView(root)
        web.loadUrl("file:///android_asset/index.html")

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                web.evaluateJavascript("window.appBack&&window.appBack()") { r ->
                    if (r != "true") finish()
                }
            }
        })
    }

    private fun openExternal(u: Uri) {
        try { startActivity(Intent(Intent.ACTION_VIEW, u)) } catch (_: Exception) {}
    }

    inner class Bridge {
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
