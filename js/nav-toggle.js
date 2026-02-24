document.addEventListener('DOMContentLoaded', function () {
  // Attach toggle handlers to .dropdown-toggle buttons
  document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var li = btn.closest('.dropdown-parent');
      if (!li) return;
      var isOpen = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  // Optional: close open menus when clicking outside
  document.addEventListener('click', function (e) {
    var openParents = document.querySelectorAll('.dropdown-parent.open');
    if (!openParents.length) return;
    var clickedInsideAny = Array.from(openParents).some(function (li) {
      return li.contains(e.target);
    });
    if (!clickedInsideAny) {
      openParents.forEach(function (li) { li.classList.remove('open');
        var btn = li.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
