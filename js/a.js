const pages = [
  { url: "digital-illustration.html" },
  { url: "english-grammar-notes.html" },
  { url: "index.html" }, // ホームページ
  { url: "math.html" },
  { url: "nothing-to-see-here.html" },
  { url: "self-introduction.html" },
  { url: "objectives-list.html" },
];

function generateNavigation() {
  const navElement = document.getElementById('main-nav');
  if (!navElement) {
    console.error("ナビゲーション要素が見つかりません。IDが 'main-nav' であることを確認してください。");
    return;
  }

  // 現在のページのファイル名を取得
  // 例: http://example.com/some/path/index.html から 'index.html' を取得
  const currentPagePath = window.location.pathname;
  const currentPageFileName = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1);

  const ul = document.createElement('ul');

  pages.forEach(page => {
    if (page.url !== currentPageFileName) {
      let linkName = page.url.replace('.html', '');

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = page.url;
      a.textContent = linkName;
      li.appendChild(a);
      ul.appendChild(li);
    }
  });
  navElement.appendChild(ul);
}

// ページロード時にナビゲーションを生成
document.addEventListener('DOMContentLoaded', generateNavigation);