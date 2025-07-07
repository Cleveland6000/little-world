const pages = [
    { url: "digital-illustration.html" },
    { url: "english-grammar-notes.html" },
    { url: "index.html" }, // ホームページ
    { url: "math.html" },
    { url: "nothing-to-see-here.html" },
    { url: "self-introduction.html" },
    { url: "objectives-list.html" },
];

function generateNavigation(currentPageUrl) {
    const navElement = document.getElementById('main-nav');
    if (!navElement) {
        console.error("ナビゲーション要素が見つかりません。IDが 'main-nav' であることを確認してください。");
        return;
    }

    const ul = document.createElement('ul');

    pages.forEach(page => {
        // ファイル名から拡張子(.html)を除去してリンク名とする
        let linkName = page.url.replace('.html', '');

        // もしindex.htmlであれば「ホーム」と表示する
        if (linkName === 'index') {
            linkName = 'ホーム';
        } else {
            // ハイフンをスペースに置換し、各単語の先頭を大文字にする (任意)
            linkName = linkName.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }

        if (page.url !== currentPageUrl) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = page.url;
            a.textContent = linkName; // 生成したリンク名をtextContentに設定
            li.appendChild(a);
            ul.appendChild(li);
        }
    });
    navElement.appendChild(ul);
}