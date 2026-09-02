/* ===========================================================================
   progress.js — per-question "covered" ticks, saved to localStorage, plus the
   sticky progress bar and the per-part footer count.

   Storage key and id scheme are unchanged from the original single-file page,
   so progress saved there still loads here.

   Exposes AD.initProgress(); call it after AD.render().
   =========================================================================== */

window.AD = window.AD || {};

(function () {
  "use strict";

  /* Progress is keyed by each part's stable `id` slug (e.g. "growth:3"), so
     reordering parts no longer disturbs saved ticks. Key last bumped when the
     scheme moved off positional p0/p1/... ids. */
  var KEY = "dg-alignment-v4";

  AD.initProgress = function initProgress() {
    var state = {};
    try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; }
    catch (e) { state = {}; }

    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    }

    var parts = Array.prototype.slice.call(document.querySelectorAll(".part"));
    var fill = document.getElementById("fill");
    var count = document.getElementById("count");
    var total = 0;

    parts.forEach(function (part) {
      var items = Array.prototype.slice.call(part.querySelectorAll(".q"));
      total += items.length;

      var foot = document.createElement("p");
      foot.className = "pfoot";
      var body = part.querySelector(".pbody");
      if (body) body.appendChild(foot);

      function refresh() {
        var n = 0;
        items.forEach(function (li, i) {
          var id = part.id + ":" + i;
          var on = !!state[id];
          li.classList.toggle("answered", on);
          var b = li.querySelector(".tick");
          b.setAttribute("aria-pressed", on ? "true" : "false");
          b.textContent = on ? "✓" : "";
          if (on) n++;
        });
        part.classList.toggle("alldone", items.length > 0 && n === items.length);
        foot.textContent = n + " dari " + items.length + " sudah dibahas di bagian ini";
        globalRefresh();
      }

      items.forEach(function (li, i) {
        var id = part.id + ":" + i;
        li.querySelector(".tick").addEventListener("click", function () {
          if (state[id]) { delete state[id]; } else { state[id] = 1; }
          save();
          refresh();
        });
      });

      part._refresh = refresh;
    });

    function globalRefresh() {
      var n = 0;
      for (var k in state) {
        if (Object.prototype.hasOwnProperty.call(state, k)) n++;
      }
      if (n > total) n = total;
      if (fill) fill.style.width = (total ? Math.round(n / total * 100) : 0) + "%";
      if (count) count.textContent = n + "/" + total;
    }

    parts.forEach(function (p) { if (p._refresh) p._refresh(); });
  };
})();
