/* ===========================================================================
   render.js — turns window.ALIGNMENT_DAY into the page DOM.

   Emits exactly the class names the stylesheets in css/ expect. If you change
   the markup here, check it against reference/alignmentday.original.html.

   Exposes AD.render(); call it once before progress.js / pause.js run.
   =========================================================================== */

window.AD = window.AD || {};

(function () {
  "use strict";

  var TENSE_LABEL = { six: "Enam bulan", now: "Sekarang", ahead: "Ke depan" };

  /* --- tiny DOM helpers ------------------------------------------------- */

  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) {
          node.setAttribute(k, attrs[k]);
        }
      }
    }
    return node;
  }

  /* Content strings are authored in js/content.js and trusted. They may
     carry <strong>/<em>/<br> only. */
  function rich(tag, className, html) {
    var node = el(tag, className);
    node.innerHTML = html;
    return node;
  }

  function append(parent, child) {
    if (child == null) return parent;
    if (Array.isArray(child)) {
      child.forEach(function (c) { append(parent, c); });
    } else {
      parent.appendChild(child);
    }
    return parent;
  }

  /* --- masthead ------------------------------------------------------- */

  function renderMast(meta) {
    var frag = document.createDocumentFragment();

    append(frag, rich("p", "for", meta.kicker));
    append(frag, rich("h1", null, meta.title));
    append(frag, rich("p", "sub", meta.subtitle));

    var names = el("div", "names");
    append(names, rich("span", "dd", meta.dName));
    append(names, rich("span", "amp", "&amp;"));
    append(names, rich("span", "gg", meta.gName));
    append(frag, names);

    (meta.intro || []).forEach(function (p) {
      append(frag, rich("p", "body", p));
    });

    var box = el("div", "legend-box");
    append(box, rich("h4", null, meta.legendTitle || "Cara baca halaman ini"));
    (meta.legend || []).forEach(function (row) {
      append(box, renderLegendRow(row));
    });
    append(frag, box);

    return frag;
  }

  function renderLegendRow(row) {
    var wrap = el("div", "legend-row");
    var key;

    if (row.type === "tick") {
      key = el("span", "k lg-tick");
      key.innerHTML = "&#10003;";
    } else if (row.type === "do") {
      key = el("span", "k lg-do");
      key.textContent = "Lakukan ini";
    } else if (row.type === "note") {
      key = el("span", "k lg-note");
      key.textContent = "Catatan";
    } else if (row.type === "tense") {
      key = el("span", "k");
      var t = el("span", "tense t-" + row.tense);
      t.textContent = row.label;
      key.appendChild(t);
    } else { /* tense-dashed */
      key = el("span", "k");
      var d = el("span", "tense", { style: "border-style:dashed" });
      d.textContent = row.label;
      key.appendChild(d);
    }

    append(wrap, key);
    append(wrap, rich("span", null, row.text));
    return wrap;
  }

  /* --- parts --------------------------------------------------------- */

  function renderPart(part, index) {
    var details = el("details", "part", { id: part.id });
    if (part.open) details.setAttribute("open", "");

    var num = pad2(index);   /* displayed number = position in the parts array */

    var summary = el("summary");
    append(summary, rich("span", "pnum", num));

    var mid = el("span");
    append(mid, rich("span", "ptitle", part.title));
    var pmeta = el("span", "pmeta", { "data-meta": "" });
    pmeta.textContent = part.meta;
    append(mid, pmeta);
    append(summary, mid);

    var chev = el("span", "chev");
    chev.innerHTML = "&#9662;";
    append(summary, chev);
    append(details, summary);

    var body = el("div", "pbody");
    if (part.lead) append(body, rich("p", "lead", part.lead));
    if (part.why) {
      var why = el("div", "why");
      var tag = el("span", "tag");
      tag.textContent = "Kenapa ini penting";
      append(why, tag);
      append(why, rich("p", null, part.why));
      append(body, why);
    }

    (part.body || []).forEach(function (item) {
      append(body, renderItem(item));
    });

    append(details, body);
    return details;
  }

  /* --- items -------------------------------------------------------- */

  function renderItem(item) {
    switch (item.kind) {
      case "section":   return renderSection(item);
      case "do":        return renderDo(item);
      case "note":      return renderNote(item);
      case "questions": return renderQuestions(item);
      case "models":    return renderModels(item);
      case "map":       return renderMap(item);
      case "sort":      return renderSort(item);
      case "text":      return rich("p", "hint", item.html);
      case "closeNote": return rich("p", "close-note", item.html);
      case "sig":       return rich("p", "sig", item.text);
      default:          return null;
    }
  }

  function renderSection(item) {
    var block = el("div", "block");
    append(block, rich("h3", null, item.title));
    if (item.intro) {
      var intro = rich("p", "hint", item.intro);
      intro.setAttribute("style", "margin-bottom:.8rem");
      append(block, intro);
    }
    (item.items || []).forEach(function (sub) {
      append(block, renderItem(sub));
    });
    return block;
  }

  function renderList(list) {
    if (!list) return null;
    var ol = el(list.ordered ? "ol" : "ul");
    (list.items || []).forEach(function (li) {
      append(ol, rich("li", null, li));
    });
    return ol;
  }

  function renderTwocol(twocol) {
    if (!twocol || !twocol.length) return null;
    var wrap = el("div", "twocol");
    var cls = ["c cd", "c cg"];
    twocol.forEach(function (col, i) {
      var c = el("div", cls[i] || "c cd");
      var b = el("b");
      b.textContent = col.who;
      append(c, b);
      c.appendChild(document.createTextNode(col.text));
      append(wrap, c);
    });
    return wrap;
  }

  function renderScale(scale) {
    if (!scale || !scale.length) return null;
    var wrap = el("div", "scale");
    scale.forEach(function (s) {
      var row = el("div");
      var b = el("b");
      b.textContent = s.n;
      var span = el("span");
      span.textContent = s.text;
      append(row, b);
      append(row, span);
      append(wrap, row);
    });
    return wrap;
  }

  function renderDo(item) {
    var box = el("div", "do");
    var tag = el("span", "tag");
    tag.textContent = item.tag || "Lakukan ini";
    append(box, tag);

    (item.text || []).forEach(function (p) { append(box, rich("p", null, p)); });
    append(box, renderList(item.list));
    append(box, renderTwocol(item.twocol));
    append(box, renderScale(item.scale));
    return box;
  }

  function renderNote(item) {
    var box = el("div", "note");
    var tag = el("span", "tag");
    tag.textContent = item.tag || "Catatan";
    append(box, tag);

    (item.text || []).forEach(function (p) { append(box, rich("p", null, p)); });
    if (item.list && item.list.length) {
      var ul = el("ul");
      item.list.forEach(function (li) { append(ul, rich("li", null, li)); });
      append(box, ul);
    }
    (item.textAfter || []).forEach(function (p) { append(box, rich("p", null, p)); });
    return box;
  }

  function renderQuestions(item) {
    var ul = el("ul", "qs");
    (item.list || []).forEach(function (q) {
      var li = el("li", "q");

      var btn = el("button", "tick", {
        type: "button",
        "aria-pressed": "false",
        "aria-label": "Mark done"
      });
      append(li, btn);

      var div = el("div");
      if (q.tense) {
        var t = el("span", "tense t-" + q.tense);
        t.textContent = TENSE_LABEL[q.tense] || q.tense;
        append(div, t);
      }
      append(div, rich("p", "qtext", q.text));
      if (q.hint) append(div, rich("span", "hint", q.hint));
      if (q.shape) {
        var shape = el("span", "shape");
        var b = el("b");
        b.textContent = "Coba bilang begini";
        var i = el("i");
        i.textContent = q.shape;
        append(shape, b);
        append(shape, i);
        append(div, shape);
      }
      append(li, div);
      append(ul, li);
    });
    return ul;
  }

  function renderModels(item) {
    var wrap = el("div", "models");
    (item.list || []).forEach(function (m) {
      var card = el("div", "model");
      append(card, rich("h4", null, m.name));
      append(card, rich("p", "desc", m.desc));
      var tt = el("div", "tt");
      append(tt, labelled("Cocok kalau", m.worksWhen));
      append(tt, labelled("Tegang kalau", m.strainsWhen));
      append(card, tt);
      append(wrap, card);
    });
    return wrap;
  }

  function labelled(label, text) {
    var span = el("span");
    var b = el("b");
    b.textContent = label;
    append(span, b);
    var val = el("span");
    val.innerHTML = text;          /* trusted content, may carry <em>/<strong> */
    while (val.firstChild) span.appendChild(val.firstChild);
    return span;
  }

  function renderMap(item) {
    var frag = document.createDocumentFragment();

    var box = el("div", "do");
    var tag = el("span", "tag");
    tag.textContent = "Lakukan ini";
    append(box, tag);
    if (item.intro) append(box, rich("p", null, item.intro));
    append(box, renderScale(item.scale));
    if (item.outro) append(box, rich("p", null, item.outro));
    append(frag, box);

    var ol = el("ol", "map");
    (item.list || []).forEach(function (text, i) {
      var li = el("li");
      var n = el("span", "n");
      n.textContent = pad2(i + 1);
      var body = el("span");
      body.textContent = text;
      var sc = el("span", "sc");
      sc.textContent = "1 2 3";
      append(li, n);
      append(li, body);
      append(li, sc);
      append(ol, li);
    });
    append(frag, ol);
    return frag;
  }

  function renderSort(item) {
    var wrap = el("div", "sort");
    (item.list || []).forEach(function (col) {
      var c = el("div", "sortcol");
      append(c, rich("h4", null, col.name));
      append(c, rich("p", null, col.text));
      append(wrap, c);
    });
    return wrap;
  }

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  /* --- pause sheet -------------------------------------------------- */

  function renderPause(pause) {
    var inner = el("div", "sheet-in", {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "sheet-title"
    });

    var h3 = el("h3", null, { id: "sheet-title" });
    h3.textContent = pause.title;
    append(inner, h3);

    append(inner, textP("sd", pause.desc));

    var ol = el("ol");
    (pause.steps || []).forEach(function (s) { append(ol, rich("li", null, s)); });
    append(inner, ol);

    append(inner, textP("sd", pause.lineIntro));
    append(inner, rich("p", "say", pause.line));
    append(inner, textP("sd", pause.reassurance));

    var close = el("button", "closebtn", { type: "button", id: "closebtn" });
    close.textContent = "Lanjut lagi";
    append(inner, close);

    return inner;
  }

  function textP(className, text) {
    var p = el("p", className);
    p.textContent = text;
    return p;
  }

  /* --- entry point ------------------------------------------------- */

  AD.render = function render(data) {
    data = data || window.ALIGNMENT_DAY;
    if (!data) throw new Error("ALIGNMENT_DAY content not loaded");

    if (data.meta && data.meta.docTitle) document.title = data.meta.docTitle;

    var mast = document.getElementById("mast");
    if (mast) {
      mast.innerHTML = "";
      mast.appendChild(renderMast(data.meta || {}));
    }

    var parts = document.getElementById("parts");
    if (parts) {
      parts.innerHTML = "";
      (data.parts || []).forEach(function (part, i) {
        parts.appendChild(renderPart(part, i));
      });
    }

    var sheet = document.getElementById("sheet");
    if (sheet) {
      sheet.innerHTML = "";
      sheet.appendChild(renderPause(data.pause || {}));
    }
  };
})();
