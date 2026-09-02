/* ===========================================================================
   pause.js — the "Pause" floating button and its bottom sheet.

   Exposes AD.initPause(); call it after AD.render() (the sheet contents are
   built by the renderer).
   =========================================================================== */

window.AD = window.AD || {};

(function () {
  "use strict";

  AD.initPause = function initPause() {
    var sheet = document.getElementById("sheet");
    var pausebtn = document.getElementById("pausebtn");
    var closebtn = document.getElementById("closebtn");
    if (!sheet || !pausebtn || !closebtn) return;

    function openSheet() { sheet.hidden = false; closebtn.focus(); }
    function closeSheet() { sheet.hidden = true; pausebtn.focus(); }

    pausebtn.addEventListener("click", openSheet);
    closebtn.addEventListener("click", closeSheet);
    sheet.addEventListener("click", function (e) {
      if (e.target === sheet) closeSheet();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !sheet.hidden) closeSheet();
    });
  };
})();
