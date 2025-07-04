/**
 * 指定したカテゴリのリンクをJSONデータから抽出し、ターゲット要素内に表示する関数
 * @param {string} targetElementId リンクを表示するHTML要素のID
 * @param {string} category 抽出したいカテゴリ名（例: 'music', 'software'）
 * @param {string} jsonFilePath リンクデータが格納されたJSONファイルのパス
 */
async function displayLinksFromJsonByCategory(targetElementId, category, jsonFilePath) {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
        console.error(`ターゲット要素ID '${targetElementId}' が見つかりません。`);
        return;
    }

    // 自身のドメイン（ベースURL）を定義
    // GitHub Pagesのユーザーサイトの場合: "https://cleveland6000.github.io/"
    // GitHub Pagesのプロジェクトサイトの場合: "https://cleveland6000.github.io/little-world/"
    // 今回のケースでは、プロジェクトサイトのURLに合わせて定義します
    const baseUrl = 'https://cleveland6000.github.io/little-world/'; // ここを自身のサイトのベースURLに設定

    try {
        // JSONファイルを非同期で読み込む
        const response = await fetch(jsonFilePath);
        if (!response.ok) {
            throw new Error(`JSONファイルの読み込みに失敗しました: ${response.statusText}`);
        }
        const linksData = await response.json(); // JSONデータをパース

        // 表示するリンクを格納するリストを作成
        const ul = document.createElement('ul');

        linksData.forEach(linkItem => {
            // 指定されたカテゴリがこのリンクに含まれているかチェック
            if (Array.isArray(linkItem.categories) && linkItem.categories.includes(category)) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = linkItem.url;
                a.textContent = linkItem.title;

                // ここから修正点: 自身のサイトのURLで始まらない場合に外部リンクとみなす
                // linkItem.url が相対パスの場合も考慮して、baseURLとの比較で判断
                if (!linkItem.url.startsWith('/') && !linkItem.url.startsWith(baseUrl)) {
                    // / で始まらない（相対パスではない）かつ、自身のbaseURLでも始まらない場合
                    a.target = '_blank'; // 新しいタブで開く
                    a.rel = 'noopener noreferrer'; // セキュリティ対策
                } else if (linkItem.url.startsWith(baseUrl) && linkItem.url.length > baseUrl.length) {
                    // baseUrlで始まるが、かつbaseUrlより長いURLの場合（例: https://cleveland6000.github.io/little-world/page/xyz.html）
                    // これは内部リンクなので、target="_blank" を設定しない
                    // (ただし、もし明示的に内部リンクも別タブで開きたい場合はここを変更)
                } else if (!linkItem.url.startsWith('/') && (linkItem.url.startsWith('http://') || linkItem.url.startsWith('https://'))) {
                    // 絶対URLだが、自身のbaseUrlとは異なる場合（例: https://example.com/）
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                }
                // よりシンプルな判定ロジックに書き直すなら、以下のようにできます:
                // URLが絶対URL（http://またはhttps://で始まる）であり、かつ自身のベースURLで始まらない場合
                // const isAbsoluteUrl = linkItem.url.startsWith('http://') || linkItem.url.startsWith('https://');
                // if (isAbsoluteUrl && !linkItem.url.startsWith(baseUrl)) {
                //     a.target = '_blank';
                //     a.rel = 'noopener noreferrer';
                // }


                li.appendChild(a);
                ul.appendChild(li);
            }
        });

        // 既存の内容をクリアして、新しいリストを追加
        targetElement.innerHTML = '';
        targetElement.appendChild(ul);

    } catch (error) {
        console.error('リンクデータの読み込みまたは処理中にエラーが発生しました:', error);
        targetElement.innerHTML = '<p>リンクの読み込みに失敗しました。</p>'; // エラーメッセージを表示
    }
}