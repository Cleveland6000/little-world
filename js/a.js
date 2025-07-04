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
    const baseUrl = 'https://cleveland6000.github.io/little-world/'; // ここを自身のサイトのベースURLに設定

    try {
        const response = await fetch(jsonFilePath);
        if (!response.ok) {
            throw new Error(`JSONファイルの読み込みに失敗しました: ${response.statusText}`);
        }
        let linksData = await response.json(); 

        linksData.sort((a, b) => {
            return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
        });
        const ul = document.createElement('ul');

        linksData.forEach(linkItem => {
            if (Array.isArray(linkItem.categories) && linkItem.categories.includes(category)) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = linkItem.url;
                a.textContent = linkItem.title;

                const isAbsoluteUrl = linkItem.url.startsWith('http://') || linkItem.url.startsWith('https://');
                if (isAbsoluteUrl && !linkItem.url.startsWith(baseUrl)) {
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                }

                li.appendChild(a);
                ul.appendChild(li);
            }
        });

        targetElement.innerHTML = '';
        targetElement.appendChild(ul);

    } catch (error) {
        console.error('リンクデータの読み込みまたは処理中にエラーが発生しました:', error);
        targetElement.innerHTML = '<p>リンクの読み込みに失敗しました。</p>'; // エラーメッセージを表示
    }
}