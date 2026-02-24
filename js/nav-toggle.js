document.addEventListener('DOMContentLoaded', function () {
  // Attach toggle handlers to .dropdown-toggle buttons (submenu toggles)
  function initSubmenuToggles() {
    document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
      // avoid attaching twice
      if (btn._navToggleAttached) return;
      btn._navToggleAttached = true;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var li = btn.closest('.dropdown-parent');
        if (!li) return;
        var isOpen = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    });
  }

  // Main nav toggle (hamburger)
  function initMainToggle() {
    var mainBtn = document.querySelector('.nav-toggle-main');
    var siteNav = document.getElementById('site-nav');
    if (!mainBtn || !siteNav) return;
    if (mainBtn._navMainAttached) return;
    mainBtn._navMainAttached = true;
    mainBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = siteNav.classList.toggle('open');
      mainBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  initSubmenuToggles();
  initMainToggle();

  // Close open menus when clicking outside (closes both main nav and submenus)
  document.addEventListener('click', function (e) {
    var siteNav = document.getElementById('site-nav');
    var mainBtn = document.querySelector('.nav-toggle-main');
    var openParents = document.querySelectorAll('.dropdown-parent.open');
    var clickedInsideNav = false;
    if (siteNav && siteNav.contains(e.target)) clickedInsideNav = true;
    if (mainBtn && mainBtn.contains(e.target)) clickedInsideNav = true;
    if (!clickedInsideNav) {
      if (siteNav && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        if (mainBtn) mainBtn.setAttribute('aria-expanded', 'false');
      }
      openParents.forEach(function (li) {
        li.classList.remove('open');
        var btn = li.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
