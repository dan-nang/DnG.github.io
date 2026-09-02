/* ===========================================================================
   main.js — wires the pieces together once the DOM is ready.
   Load order (see index.html): content -> render -> progress -> pause -> main.
   =========================================================================== */

(function () {
  "use strict";

  function boot() {
    try {
      window.AD.render();
      window.AD.initProgress();
      window.AD.initPause();
    } catch (err) {
      console.error("Alignment Day gagal dimulai:", err);
      var parts = document.getElementById("parts");
      if (parts) {
        parts.textContent =
          "Ada yang salah saat memuat halaman ini. Buka console browser untuk detailnya.";
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
