function generateNavigation() {
  const navElement = document.getElementById('main-nav');
  if (!navElement) {
    console.error("ナビゲーション要素が見つかりません。IDが 'main-nav' であることを確認してください。");
    return;
  }

  fetch('../json/pages.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(pages => {
      const currentPageFileName = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
      const ul = document.createElement('ul');
      const fragment = document.createDocumentFragment();

      pages.forEach(page => {
        const li = document.createElement('li');
        const textToShow = page.display_name;
        // Pythonで結合されたクラス文字列をそのまま取得
        const iconClassesString = page.icon; 

        const iconElement = document.createElement('i');
        
        // --- ここが修正点 ---
        // スペースで区切られたクラス文字列を配列に分割し、それぞれを追加
        iconElement.classList.add(...iconClassesString.split(' ')); 
        // --- 修正ここまで ---

        if (page.url === currentPageFileName) {
          const span = document.createElement('span');
          span.textContent = textToShow;
          li.appendChild(iconElement);
          li.appendChild(span);
        } else {
          const a = document.createElement('a');
          a.href = page.url;
          a.textContent = textToShow;
          
          li.appendChild(iconElement);
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