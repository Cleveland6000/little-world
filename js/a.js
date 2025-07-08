function generateNavigation() {
  const navElement = document.getElementById('main-nav');
  if (!navElement) {
    console.error("ナビゲーション要素が見つかりません。IDが 'main-nav' であることを確認してください。");
    return;
  }

  // JSONファイルを非同期で読み込む
  fetch('../html/pages.json') // pages.jsonのパスを指定
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(pages => {
      const currentPageFileName = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
      const ul = document.createElement('ul');
      const fragment = document.createDocumentFragment(); // DocumentFragment を使用

      pages.forEach(page => {
        const li = document.createElement('li');
        let linkName = page.url.replace('.html', '');

        if (page.url === currentPageFileName) {
          const span = document.createElement('span');
          span.textContent = linkName;
          li.appendChild(span);
        } else {
          const a = document.createElement('a');
          a.href = page.url;
          a.textContent = linkName;
          li.appendChild(a);
        }
        fragment.appendChild(li); // DocumentFragment に追加
      });
      ul.appendChild(fragment); // 最後に DocumentFragment をまとめて追加
      navElement.appendChild(ul);
    })
    .catch(error => {
      console.error('ナビゲーションデータの読み込み中にエラーが発生しました:', error);
    });
}

document.addEventListener('DOMContentLoaded', generateNavigation);