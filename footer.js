/*
  Shared site footer for Amici Instruments.
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
    { href: 'brunomanual.html', label: 'Bruno Manual' },
    { href: 'support.html',     label: 'Support' },
    { href: 'privacy.html',     label: 'Privacy' }
  ];

  var brandMark =
    '<svg class="ss-mark" width="22" height="22" viewBox="0 0 512 512" aria-hidden="true">' +
      '<defs><clipPath id="ss-mark-ftr"><rect width="512" height="512" rx="96" ry="96"/></clipPath></defs>' +
      '<g clip-path="url(#ss-mark-ftr)">' +
        '<rect y="0" width="512" height="102.4" fill="#00D9F5"/>' +
        '<rect y="102.4" width="512" height="102.4" fill="#2E7BFF"/>' +
        '<rect y="204.8" width="512" height="102.4" fill="#7BD957"/>' +
        '<rect y="307.2" width="512" height="102.4" fill="#F5A044"/>' +
        '<rect y="409.6" width="512" height="102.4" fill="#B14BE0"/>' +
      '</g>' +
    '</svg>';

  var year = new Date().getFullYear();

  var linksHtml = FOOTER_LINKS.map(function (link) {
    return '<a href="' + link.href + '" style="color:#6b6b78;text-decoration:none;">' + link.label + '</a>';
  }).join('');

  var footerHtml =
    '<footer>' +
      '<a href="index.html" class="topnav-brand" style="justify-content:center;color:#6b6b78;font-size:14px;">' +
        brandMark + ' Amici Instruments' +
      '</a>' +
      '<p style="margin-top:8px;">&copy; ' + year + ' Amici Instruments. All rights reserved.</p>' +
      '<div style="margin-top:12px;display:flex;gap:22px;justify-content:center;flex-wrap:wrap;font-size:13px;">' +
        linksHtml +
      '</div>' +
    '</footer>';

  var mount = document.getElementById('site-footer');
  if (mount) mount.innerHTML = footerHtml;
})();
