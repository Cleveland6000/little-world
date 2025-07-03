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
            // categoriesプロパティが配列であり、かつ指定カテゴリを含むか確認
            if (Array.isArray(linkItem.categories) && linkItem.categories.includes(category)) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = linkItem.url;
                a.textContent = linkItem.title;
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