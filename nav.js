/*
  Shared site navigation for Swift SW.
  -------------------------------------
  Each page includes:  <div id="site-nav"></div><script src="nav.js"></script>

  To change the menu site-wide, edit the NAV array below — every page updates.
  Desktop dropdowns, the mobile hamburger menu, all styling and behaviour are
  self-contained in this file. Pages need no nav-specific CSS beyond the base
  .topnav rules already in their <style>.

  Menu item types:
    { type: 'link', href: '...', label: '...' }      — a plain link
    { type: 'menu', label: '...', items: [ ... ] }    — a dropdown / group
  Dropdown items:
    { href: '...', label: '...' }                     — a link
    { label: '...', soon: true }                      — a "coming soon" entry

  When a Bruno page is ready, give its item an `href` and remove `soon: true`.
*/
(function () {
  var NAV = [
    { type: 'link', href: 'index.html', label: 'Home' },
    { type: 'menu', label: 'Apps', items: [
        { href: 'marco.html', label: 'Marco' },
        { label: 'Bruno', soon: true }
    ]},
    { type: 'menu', label: 'Manuals', items: [
        { href: 'marcomanual.html', label: 'Marco' },
        { label: 'Bruno', soon: true }
    ]},
    { type: 'link', href: 'support.html', label: 'Support' }
  ];

  var page = location.pathname.split('/').pop() || 'index.html';
  if (page === '') page = 'index.html';

  /* ---------------------------------------------------------------- styles */
  var css =
    /* desktop dropdowns */
    '.topnav-links{align-items:center;}' +
    '.nav-dd{position:relative;}' +
    '.nav-dd-toggle{font:inherit;font-size:14px;font-weight:500;color:#9a9aa6;' +
      'background:none;border:none;padding:0;margin:0;cursor:pointer;' +
      'display:inline-flex;align-items:center;gap:5px;transition:color .2s ease;}' +
    '.nav-dd-toggle:hover{color:#f2f2f5;}' +
    '.nav-dd.active .nav-dd-toggle{color:#5BA8E5;}' +
    '.nav-dd-caret{font-size:9px;line-height:1;transition:transform .2s ease;}' +
    '.nav-dd.open .nav-dd-caret{transform:rotate(180deg);}' +
    '.nav-dd-menu{position:absolute;top:calc(100% + 12px);left:50%;' +
      'transform:translateX(-50%);background:#0e0e12;border:1px solid #1f1f28;' +
      'border-radius:10px;padding:6px;min-width:160px;display:none;' +
      'box-shadow:0 16px 40px rgba(0,0,0,.5);}' +
    '.nav-dd.open .nav-dd-menu{display:block;}' +
    '.nav-dd-menu a,.nav-dd-menu .nav-dd-soon{display:block;padding:9px 14px;' +
      'font-size:14px;border-radius:6px;text-decoration:none;white-space:nowrap;}' +
    '.nav-dd-menu a{color:#9a9aa6;}' +
    '.nav-dd-menu a:hover{background:#14141a;color:#f2f2f5;}' +
    '.nav-dd-menu a.active{color:#5BA8E5;}' +
    '.nav-dd-menu .nav-dd-soon{color:#6b6b78;cursor:default;}' +
    '.nav-dd-menu .nav-dd-soon::after{content:" \\2014 soon";font-size:11px;opacity:.7;}' +
    /* hamburger button */
    '.nav-burger{display:none;flex-direction:column;justify-content:center;' +
      'gap:5px;width:40px;height:40px;padding:0;margin:0;background:none;' +
      'border:none;cursor:pointer;}' +
    '.nav-burger span{display:block;width:22px;height:2px;background:#f2f2f5;' +
      'border-radius:2px;margin:0 auto;transition:transform .25s ease,opacity .2s ease;}' +
    '.topnav.nav-open .nav-burger span:nth-child(1){transform:translateY(7px) rotate(45deg);}' +
    '.topnav.nav-open .nav-burger span:nth-child(2){opacity:0;}' +
    '.topnav.nav-open .nav-burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}' +
    /* mobile panel */
    '.nav-mobile{display:none;border-top:1px solid #1f1f28;padding:8px 0 14px;}' +
    '.nav-mobile a,.nav-mobile .nav-m-soon{display:block;text-decoration:none;}' +
    '.nav-mobile a{padding:13px 24px;font-size:16px;color:#f2f2f5;}' +
    '.nav-mobile a:active{background:#14141a;}' +
    '.nav-mobile a.active{color:#5BA8E5;}' +
    '.nav-mobile .nav-m-group{padding:16px 24px 4px;font-size:11px;font-weight:700;' +
      'letter-spacing:2px;text-transform:uppercase;color:#6b6b78;}' +
    '.nav-mobile .nav-m-sub{padding-left:40px;font-size:15px;}' +
    '.nav-mobile .nav-m-soon{padding:11px 24px 11px 40px;font-size:15px;color:#6b6b78;}' +
    '.nav-mobile .nav-m-soon::after{content:" \\2014 soon";font-size:11px;opacity:.7;}' +
    /* breakpoint: swap desktop nav for hamburger */
    '@media(max-width:640px){' +
      '.topnav-links{display:none;}' +
      '.nav-burger{display:flex;}' +
      '.topnav.nav-open .nav-mobile{display:block;}' +
    '}';
  var styleEl = document.createElement('style');
  styleEl.id = 'nav-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ----------------------------------------------------------- brand mark */
  var brandMark =
    '<svg class="ss-mark" width="26" height="26" viewBox="0 0 512 512" aria-hidden="true">' +
      '<defs><clipPath id="ss-mark-nav"><rect width="512" height="512" rx="96" ry="96"/></clipPath></defs>' +
      '<g clip-path="url(#ss-mark-nav)">' +
        '<rect y="0" width="512" height="102.4" fill="#2E7BFF"/>' +
        '<rect y="102.4" width="512" height="102.4" fill="#00D9F5"/>' +
        '<rect y="204.8" width="512" height="102.4" fill="#7BD957"/>' +
        '<rect y="307.2" width="512" height="102.4" fill="#F5A044"/>' +
        '<rect y="409.6" width="512" height="102.4" fill="#B14BE0"/>' +
      '</g>' +
    '</svg>';

  /* --------------------------------------------------- desktop menu HTML */
  var desktopHtml = NAV.map(function (entry) {
    if (entry.type === 'link') {
      var cls = (entry.href === page) ? ' class="active"' : '';
      return '<a href="' + entry.href + '"' + cls + '>' + entry.label + '</a>';
    }
    var menuActive = entry.items.some(function (it) { return it.href === page; });
    var menuItems = entry.items.map(function (it) {
      if (it.soon) return '<span class="nav-dd-soon">' + it.label + '</span>';
      var ic = (it.href === page) ? ' class="active"' : '';
      return '<a href="' + it.href + '"' + ic + '>' + it.label + '</a>';
    }).join('');
    return '<div class="nav-dd' + (menuActive ? ' active' : '') + '">' +
             '<button class="nav-dd-toggle" type="button">' + entry.label +
               '<span class="nav-dd-caret">▾</span></button>' +
             '<div class="nav-dd-menu">' + menuItems + '</div>' +
           '</div>';
  }).join('');

  /* ---------------------------------------------------- mobile menu HTML */
  var mobileHtml = NAV.map(function (entry) {
    if (entry.type === 'link') {
      var cls = (entry.href === page) ? ' class="active"' : '';
      return '<a href="' + entry.href + '"' + cls + '>' + entry.label + '</a>';
    }
    var groupHtml = '<div class="nav-m-group">' + entry.label + '</div>';
    var sub = entry.items.map(function (it) {
      if (it.soon) return '<span class="nav-m-soon">' + it.label + '</span>';
      var ic = (it.href === page) ? ' nav-m-sub active' : ' nav-m-sub';
      return '<a href="' + it.href + '" class="' + ic.trim() + '">' + it.label + '</a>';
    }).join('');
    return groupHtml + sub;
  }).join('');

  /* ----------------------------------------------------------- assemble */
  var navHtml =
    '<nav class="topnav">' +
      '<div class="topnav-inner">' +
        '<a href="index.html" class="topnav-brand">' + brandMark + ' Swift SW</a>' +
        '<div class="topnav-links">' + desktopHtml + '</div>' +
        '<button class="nav-burger" type="button" aria-label="Menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
      '<div class="nav-mobile">' + mobileHtml + '</div>' +
    '</nav>';

  var mount = document.getElementById('site-nav');
  if (!mount) return;
  mount.innerHTML = navHtml;

  /* --------------------------------------------------------- behaviour */
  var topnav = mount.querySelector('.topnav');
  var burger = mount.querySelector('.nav-burger');
  var dropdowns = mount.querySelectorAll('.nav-dd');

  function closeDropdowns(except) {
    dropdowns.forEach(function (dd) {
      if (dd !== except) dd.classList.remove('open');
    });
  }

  // Desktop dropdowns — click to open (works on touch and mouse).
  dropdowns.forEach(function (dd) {
    dd.querySelector('.nav-dd-toggle').addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dd.classList.contains('open');
      closeDropdowns(dd);
      dd.classList.toggle('open', !isOpen);
    });
  });

  // Mobile hamburger — toggle the slide-down panel.
  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    topnav.classList.toggle('nav-open');
  });

  // Clicking elsewhere closes desktop dropdowns and the mobile panel.
  document.addEventListener('click', function () {
    closeDropdowns(null);
    topnav.classList.remove('nav-open');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdowns(null);
      topnav.classList.remove('nav-open');
    }
  });
})();
