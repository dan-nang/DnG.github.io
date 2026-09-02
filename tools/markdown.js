/* ===========================================================================
   markdown.js — renders window.ALIGNMENT_DAY to the plain-text twin
   (alignmentday.md). Pure function, no DOM. Used by both
   tools/generate-markdown.html (browser) and tools/build-md.mjs (Node).
   =========================================================================== */

(function (root) {
  "use strict";

  var TENSE = { six: "ENAM BULAN", now: "SEKARANG", ahead: "KE DEPAN" };

  /* Prose -> markdown inline: keep emphasis, drop everything else. */
  function inline(s) {
    return String(s == null ? "" : s)
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?strong>/gi, "**")
      .replace(/<\/?em>/gi, "_")
      .replace(/[ \t]+/g, " ")
      .trim();
  }

  /* Question text is emphasised as a whole line, so strip <strong> rather
     than turning it into a nested **. */
  /* Strip all emphasis — used where the whole line is already italicised. */
  function bare(s) {
    return String(s == null ? "" : s)
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?(strong|em)>/gi, "")
      .replace(/[ \t]+/g, " ")
      .trim();
  }

  function plain(s) {
    return String(s == null ? "" : s)
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?strong>/gi, "")
      .replace(/<\/?em>/gi, "_")
      .replace(/[ \t]+/g, " ")
      .trim();
  }

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function alignmentToMarkdown(data) {
    data = data || root.ALIGNMENT_DAY;
    if (!data) throw new Error("ALIGNMENT_DAY content not loaded");

    var meta = data.meta || {};
    var out = [];
    var push = function (line) { out.push(line == null ? "" : line); };

    /* ---- header ---- */
    push("# D & G — " + inline(meta.title));
    push("");
    push("_" + inline(meta.subtitle) + ". Privat, cuma buat kita berdua._");
    push("");
    push("> Ini versi teks dari `index.html`. Dibuat otomatis dari `js/content.js` —");
    push("> regenerate lewat `tools/generate-markdown.html`, jangan diedit manual.");
    push("");
    push("> `[ ]` = pertanyaan yang kita berdua jawab. `ENAM BULAN / SEKARANG / KE DEPAN` = soal apa pertanyaannya.");
    push("");
    push("");
    push("---");

    (data.parts || []).forEach(function (part, i) {
      push("");
      push("## Bagian " + pad2(i) + " — " + inline(part.title));
      if (part.meta) push("_" + inline(part.meta) + "_");
      push("");
      if (part.lead) { push("**" + inline(part.lead) + "**"); push(""); }
      if (part.why) { push("> **Kenapa ini penting** — " + inline(part.why)); push(""); }

      (part.body || []).forEach(function (item) { renderItem(item, push, 0); });

      push("");
      push("---");
    });

    /* ---- closing sits inside part 10's body via closeNote/sig ---- */

    return out.join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\n+---\s*$/, "")   /* drop the separator after the last part */
      .trim() + "\n";
  }

  function renderItem(item, push, depth) {
    switch (item.kind) {
      case "section":   return renderSection(item, push);
      case "do":        return renderDo(item, push);
      case "note":      return renderNote(item, push);
      case "questions": return renderQuestions(item, push);
      case "models":    return renderModels(item, push);
      case "map":       return renderMap(item, push);
      case "sort":      return renderSort(item, push);
      case "text":      push(""); push("_" + inline(item.html) + "_"); return;
      case "closeNote":
        push("");
        push("_" + bare(item.html) + "_");
        return;
      case "sig":
        push("");
        push(inline(item.text));
        return;
    }
  }

  function renderSection(item, push) {
    push("");
    push("### " + inline(item.title));
    if (item.intro) { push(""); push("_" + inline(item.intro) + "_"); }
    push("");
    (item.items || []).forEach(function (sub) { renderItem(sub, push, 1); });
  }

  function renderDo(item, push) {
    push("");
    push("**[ " + (item.tag ? tagWord(item.tag) : "LAKUKAN INI") + " ]**");
    (item.text || []).forEach(function (p) { push("  " + inline(p)); });
    if (item.list) {
      (item.list.items || []).forEach(function (li) { push("  - " + inline(li)); });
    }
    (item.twocol || []).forEach(function (c) {
      push("  - " + inline(c.who) + ": " + inline(c.text));
    });
    (item.scale || []).forEach(function (s) {
      push("  - " + s.n + " — " + inline(s.text));
    });
  }

  function renderNote(item, push) {
    push("");
    push("**[ " + (item.tag ? tagWord(item.tag) : "CATATAN") + " ]**");
    (item.text || []).forEach(function (p) { push("  " + inline(p)); });
    (item.list || []).forEach(function (li) { push("  - " + inline(li)); });
    (item.textAfter || []).forEach(function (p) { push("  " + inline(p)); });
  }

  function renderQuestions(item, push) {
    push("");
    (item.list || []).forEach(function (q) {
      var head = "- [ ] ";
      if (q.tense && TENSE[q.tense]) head += "`" + TENSE[q.tense] + "` ";
      head += "**" + plain(q.text) + "**";
      push(head);
      if (q.hint) push("      - " + inline(q.hint));
      if (q.shape) push("      - _Coba bilang begini:_ " + inline(q.shape));
    });
  }

  function renderModels(item, push) {
    push("");
    (item.list || []).forEach(function (m) {
      push("**" + inline(m.name) + "** — " + inline(m.desc));
      push("  - Cocok kalau: " + inline(m.worksWhen));
      push("  - Tegang kalau: " + inline(m.strainsWhen));
      push("");
    });
  }

  function renderMap(item, push) {
    push("");
    push("**[ LAKUKAN INI ]**");
    if (item.intro) push("  " + inline(item.intro));
    (item.scale || []).forEach(function (s) {
      push("  - " + s.n + " — " + inline(s.text));
    });
    if (item.outro) push("  " + inline(item.outro));
    push("");
    (item.list || []).forEach(function (text, i) {
      push(pad2(i + 1) + ". " + inline(text) + "  →  1 / 2 / 3");
    });
  }

  function renderSort(item, push) {
    push("");
    (item.list || []).forEach(function (col) {
      push("- **" + inline(col.name) + "** — " + inline(col.text));
    });
  }

  /* "Catatan — ucapkan ini keras-keras" -> "CATATAN" */
  function tagWord(tag) {
    var first = String(tag).split("—")[0].trim().toUpperCase();
    return first || "CATATAN";
  }

  root.alignmentToMarkdown = alignmentToMarkdown;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { alignmentToMarkdown: alignmentToMarkdown };
  }
})(typeof window !== "undefined" ? window : globalThis);
