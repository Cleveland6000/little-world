function generateNavigation() {
  const navElement = document.getElementById('main-nav');
  if (!navElement) {
    console.error("ナビゲーション要素が見つかりません。IDが 'main-nav' であることを確認してください。");
    return;
  }

  // JSONファイルを非同期で読み込む
  fetch('../json/pages.json') // pages.jsonのパスを指定
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
        const textToShow = page.display_name;
        const iconClass = page.icon || "default-icon"; // JSONに'icon'プロパティがない場合のデフォルト

        // アイコン要素を作成
        const iconElement = document.createElement('i');
        iconElement.classList.add(iconClass); // iconプロパティの値をクラスとして追加
        // 必要に応じて他のアイコンライブラリのプレフィックスなどを追加
        // 例: iconElement.classList.add("fa", iconClass); // Font Awesomeの場合

        if (page.url === currentPageFileName) {
          const span = document.createElement('span');
          span.textContent = textToShow;
          li.appendChild(iconElement); // アイコンを先に追加
          li.appendChild(span);
        } else {
          const a = document.createElement('a');
          a.href = page.url;
          a.textContent = textToShow;
          
          li.appendChild(iconElement); // アイコンを先に追加
          li.appendChild(a);
        }
        fragment.appendChild(li);
      });
      ul.appendChild(fragment);
      navElement.appendChild(ul);
    })
    .catch(error => {
      console.error('ナビゲーションデータの読み込み中にエラーが発生しました:', error);
    });
}

document.addEventListener('DOMContentLoaded', generateNavigation);