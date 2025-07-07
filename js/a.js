const pages = [
  { name: "digital-illustration", url: "digital-illustration.html" },
  { name: "english-grammar-notes", url: "english-grammar-notes.html" },
  { name: "ホーム", url: "index.html" },
  { name: "math", url: "math.html" },
  { name: "nothing-to-see-here", url: "nothing-to-see-here.html" },
  { name: "self-introduction", url: "self-introduction.html" },
  { name: "objectives-list", url: "objectives-list.html" },
];

function generateNavigation(currentPageUrl) {
  const navElement = document.getElementById('main-nav'); // ナビゲーションを表示する要素のID
  if (!navElement) {
    console.error("ナビゲーション要素が見つかりません。IDが 'main-nav' であることを確認してください。");
    return;
  }

  const ul = document.createElement('ul');

  pages.forEach(page => {
    if (page.url !== currentPageUrl) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = page.url;
      a.textContent = page.name;
      li.appendChild(a);
      ul.appendChild(li);
    }
  });
  navElement.appendChild(ul);
}