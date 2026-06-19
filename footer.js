/*
  Shared site footer for Swift SW.
  ---------------------------------
  Each page includes:  <div id="site-footer"></div><script src="footer.js"></script>
  To change footer links site-wide, edit the FOOTER_LINKS array below.

  The <footer> element styling lives in each page's <style> block and is
  consistent across pages; everything else here is self-contained inline style
  so the footer renders identically regardless of page-specific CSS.
*/
(function () {
  // Edit this list to change the footer links everywhere.
  var FOOTER_LINKS = [
    { href: 'index.html',       label: 'Home' },
    { href: 'marco.html',       label: 'Marco' },
    { href: 'marcomanual.html', label: 'Marco Manual' },
    { href: 'support.html',     label: 'Support' },
    { href: 'privacy.html',     label: 'Privacy' }
  ];

  var brandMark =
    '<svg class="ss-mark" width="32" height="20" viewBox="0 0 38 26" fill="none" aria-hidden="true">' +
      '<path d="M 4 2 L 4 22 L 36 22" stroke="#9a9aa6" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M 6 12 Q 8.75 0 11.5 12 Q 14.25 24 17 12 Q 18.5 6 20 12 Q 21.5 18 23 12 Q 25.75 0 28.5 12 Q 31.25 24 34 12" stroke="#00D9F5" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var year = new Date().getFullYear();

  var linksHtml = FOOTER_LINKS.map(function (link) {
    return '<a href="' + link.href + '" style="color:#6b6b78;text-decoration:none;">' + link.label + '</a>';
  }).join('');

  var footerHtml =
    '<footer>' +
      '<a href="index.html" class="topnav-brand" style="justify-content:center;color:#6b6b78;font-size:14px;">' +
        brandMark + ' Swift SW' +
      '</a>' +
      '<p style="margin-top:8px;">&copy; ' + year + ' Swift SW. All rights reserved.</p>' +
      '<div style="margin-top:12px;display:flex;gap:22px;justify-content:center;flex-wrap:wrap;font-size:13px;">' +
        linksHtml +
      '</div>' +
    '</footer>';

  var mount = document.getElementById('site-footer');
  if (mount) mount.innerHTML = footerHtml;
})();
