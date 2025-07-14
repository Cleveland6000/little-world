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
        const iconClassesString = page.icon;

        const iconElement = document.createElement('i');
        iconElement.classList.add(...iconClassesString.split(' '));

        // 新しいラッパー要素を作成し、すべての項目をこれで囲む
        const wrapperElement = document.createElement(page.url === currentPageFileName ? 'span' : 'a');
        if (page.url !== currentPageFileName) {
          wrapperElement.href = page.url;
        }

        // ラッパー要素に共通のスタイルクラスを追加
        // Pixivの例にあったクラスから、見た目を整えるのに役立つものを抜粋
        wrapperElement.classList.add(
          "w-full",          // 幅を親要素いっぱいに
          "h-40",          // 高さを指定
          "flex",          // flexboxで内部を配置
          "cursor-pointer",  // カーソルをポインターに
          "px-16",         // 左右のパディング
          "items-center",    // 垂直方向の中央揃え
          "select-none",     // テキスト選択を無効化
          "hover:bg-surface3", // ホバー時の背景色
          "focus-within:bg-surface3", // フォーカス時の背景色
          "duration-[0.2s]", // アニメーション時間
          "transition-[background-color]", // 背景色のトランジション
          "text-ellipsis",   // テキストが長い場合に省略
          "line-clamp-1",    // 1行に制限
          "outline-none",    // アウトラインを無効化
          "box-border",      // box-sizing: border-box
          "px-24",         // 追加の左右パディング (PixivのHTML例から)
          "gap-8",           // アイコンとテキストの間隔 (flex gap)
          "text-text2",      // テキスト色
          "[&>svg]:text-text3", // SVGアイコンの色
          "[&>pixiv-icon]:text-text3" // pixiv-iconの色
        );

        // 現在のページの場合の背景色を追加
        if (page.url === currentPageFileName) {
          wrapperElement.classList.add("bg-surface3", "aria-current"); // aria-currentはCSS側で利用
          wrapperElement.setAttribute("aria-current", "page");
        } else {
          wrapperElement.classList.add("aria-disabled:opacity-[0.32]", "aria-disabled:pointer-events-none");
        }

        wrapperElement.appendChild(iconElement);
        wrapperElement.appendChild(document.createTextNode(textToShow)); // テキストノードとして追加

        li.appendChild(wrapperElement);
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