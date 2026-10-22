# Protezione: R8 rinomina e offusca il codice Kotlin.
# Il ponte JavaScript ↔ Android deve restare con i nomi originali.
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class it.listamateriale.app.MainActivity$Bridge { *; }
