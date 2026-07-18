/* Renders a source markdown document (the single source of truth in /content)
   into a readable page. The .md files are the framework; these pages are clients
   of them, so edits happen in one place. Uses marked (loaded via CDN in the page). */
(function () {
  var target = document.getElementById('doc');
  var src = document.body.getAttribute('data-doc');

  function fail(msg) {
    target.innerHTML =
      '<p style="color:#a71828">Could not load this document (' + msg + ').</p>' +
      '<p>If you are previewing locally, serve the folder over HTTP first, for example ' +
      '<code>python3 -m http.server 8888</code>, then open ' +
      '<code>http://localhost:8888/</code>. The source is in <code>' + src + '</code>.</p>';
  }

  if (!window.marked) { fail('renderer unavailable'); return; }

  fetch(src)
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(function (md) {
      marked.setOptions({ gfm: true, breaks: false });
      target.innerHTML = marked.parse(md);

      // Make wide tables scroll horizontally on small screens instead of
      // overflowing the page.
      var tables = target.querySelectorAll('table');
      tables.forEach(function (tbl) {
        var box = document.createElement('div');
        box.className = 'table-scroll';
        tbl.parentNode.insertBefore(box, tbl);
        box.appendChild(tbl);
      });

      // Set the page title from the first heading pair, if present.
      var h2 = target.querySelector('h1 + h2') || target.querySelector('h2');
      if (h2 && h2.textContent) {
        document.title = h2.textContent.trim() + ' – SBA Student External Engagement Framework';
      }
    })
    .catch(function (e) { fail(e.message); });
})();
