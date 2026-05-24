document.querySelector('._btn_theme').addEventListener('click', function() {
  document.body.classList.toggle('_light');
});

(function() {
  const items = document.querySelectorAll('._repo_card[data-repo]');
  if (!items.length) return;

  const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Python: '#3572A5',
    'C#': '#178600',
    Java: '#b07219',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051'
  };

  fetch('https://api.github.com/users/gustavoCobello/repos?sort=updated&per_page=5&type=source')
    .then(function(r) { return r.json(); })
    .then(function(repos) {
      var filtered = repos.filter(function(r) {
        return r.name !== 'gustavoCobello';
      });
      var top3 = filtered.slice(0, 3);

      top3.forEach(function(repo, i) {
        var el = items[i];
        if (!el) return;
        var color = langColors[repo.language] || '#888';

        el.innerHTML =
          '<a href="' + repo.html_url + '" target="_blank" rel="noopener">' +
            '<div class="_repo_body">' +
              '<div class="_repo_name">' + repo.name + '</div>' +
              (repo.description ? '<div class="_repo_desc">' + repo.description + '</div>' : '') +
            '</div>' +
            '<div class="_repo_meta">' +
              '<span class="_repo_dot" style="background:' + color + '"></span>' +
              '<span>' + (repo.language || '—') + '</span>' +
            '</div>' +
            '<img class="_repo_frame" src="assets/images/frame_project_white.svg" alt="">' +
          '</a>';
      });
    })
    .catch(function() {});
})();

(function() {
  var emailBtn = document.getElementById('emailBtn');
  var popup = document.getElementById('emailPopup');
  var closeBtn = document.getElementById('popupClose');
  var copyBtn = document.getElementById('popupCopy');

  emailBtn.addEventListener('click', function() {
    popup.classList.add('_active');
  });

  function closePopup() {
    popup.classList.remove('_active');
    copyBtn.textContent = 'copiar e-mail';
  }

  closeBtn.addEventListener('click', closePopup);

  popup.addEventListener('click', function(e) {
    if (e.target === popup) closePopup();
  });

  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText('kaxxaraboy@proton.me').then(function() {
      copyBtn.textContent = 'copiado!';
      setTimeout(function() {
        copyBtn.textContent = 'copiar e-mail';
      }, 1500);
    });
  });
})();
