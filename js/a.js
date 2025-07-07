// const pages = [...] の部分は削除します

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
      return response.json(); // レスポンスをJSONとしてパース
    })
    .then(pages => { // パースされたJSONデータが 'pages' 変数に入る
      // 現在のページのファイル名を取得
      const currentPagePath = window.location.pathname;
      const currentPageFileName = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1);

      const ul = document.createElement('ul');

      pages.forEach(page => {
        const li = document.createElement('li');
        // .html を削除する処理は、linkName を使う前に定義
        let linkName = page.url.replace('.html', ''); 

        // "index" の場合に "Home" にするなどの調整
        if (linkName === "index") {
            linkName = "Home"; // 例: index.html を Home と表示
        } else if (linkName === "digital-illustration") {
            linkName = "Digital Illustration"; // 例: 複数単語の調整
        }
        // 必要に応じて、他のファイル名もここで調整できます
        // linkName = linkName.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // 例: ハイフンをスペースに変換し、各単語の頭文字を大文字にする


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
    })
    .catch(error => {
      console.error('ナビゲーションデータの読み込み中にエラーが発生しました:', error);
      // エラー時には、例えばデフォルトのナビゲーションを表示するなどのフォールバック処理をここに追加できます
    });
}

// ページロード時にナビゲーションを生成
document.addEventListener('DOMContentLoaded', generateNavigation);