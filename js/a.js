const pages = [
  { url: "digital-illustration.html" },
  { url: "english-grammar-notes.html" },
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
    const li = document.createElement('li');
    let linkName = page.url.replace('.html', ''); // .html を削除

    if (page.url === currentPageFileName) {
      // 現在のページの場合、リンクではなくテキストとして表示
      const span = document.createElement('span');
      span.textContent = linkName;
      li.appendChild(span);
    } else {
      // それ以外のページの場合、リンクとして表示
      const a = document.createElement('a');
      a.href = page.url;
      a.textContent = linkName;
      li.appendChild(a);
    }
    ul.appendChild(li);
  });
  navElement.appendChild(ul);
}

// ページロード時にナビゲーションを生成
document.addEventListener('DOMContentLoaded', generateNavigation);