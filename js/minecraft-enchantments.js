// 数値をローマ数字に変換するヘルパー関数
function toRoman(num) {
    if (num <= 0 || num > 3999) {
        return String(num); 
    }

    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let result = '';

    for (const { value, symbol } of romanNumerals) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

// エンチャントリストを表示する関数（表形式、ソート機能付き）
let currentSortColumn = 'name'; // デフォルトのソート列
let currentSortDirection = 'asc'; // デフォルトのソート順 (asc: 昇順, desc: 降順)

function displayEnchantmentList(enchantments, targetElementId) {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
        console.error(`Element with ID '${targetElementId}' not found.`);
        return;
    }

    targetElement.innerHTML = ''; // 既存の内容をクリア

    // 各エンチャントに最小価格を計算して追加
    const enchantmentsWithCalculatedData = enchantments.map(enchantment => {
        let price = 'N/A'; // デフォルトはN/A

        // tradeableがtrueの場合のみ価格を計算
        if (enchantment.tradeable) {
            let basePrice = 2 + 3 * enchantment.max_level; // 基本価格計算
            if (enchantment.is_treasure) {
                basePrice *= 2; // Treasureエンチャントなら2倍
            }
            price = basePrice;
        }
        
        return { ...enchantment, min_price: price }; // 新しいプロパティを追加
    });

    let sortedEnchantments = [...enchantmentsWithCalculatedData]; // 計算済みデータでソート

    // ソートロジック
    sortedEnchantments.sort((a, b) => {
        let valA, valB;

        if (currentSortColumn === 'name') {
            valA = a.name;
            valB = b.name;
            return currentSortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (currentSortColumn === 'max_level') {
            valA = a.max_level;
            valB = b.max_level;
            return currentSortDirection === 'asc' ? valA - valB : valB - valA;
        } else if (currentSortColumn === 'is_treasure') {
            valA = a.is_treasure;
            valB = b.is_treasure;
            if (valA !== valB) {
                return currentSortDirection === 'asc' ? (valB - valA) : (valA - valB);
            }
            return a.name.localeCompare(b.name);
        } else if (currentSortColumn === 'min_price') {
            // N/Aを数値の最後に持ってくるためのソートロジック
            const priceA = (a.min_price === 'N/A' ? Infinity : a.min_price);
            const priceB = (b.min_price === 'N/A' ? Infinity : b.min_price);
            return currentSortDirection === 'asc' ? priceA - priceB : priceB - priceA;
        } else if (currentSortColumn === 'tradeable') { // 新しいソートオプション
            valA = a.tradeable;
            valB = b.tradeable;
            // trueが先に、falseが後に来るようにソート
            if (valA !== valB) {
                return currentSortDirection === 'asc' ? (valB - valA) : (valA - valB);
            }
            return a.name.localeCompare(b.name); // 同じ場合は名前でソート
        }
        return 0;
    });

    // テーブル要素を作成
    const tableElement = document.createElement('table');
    tableElement.classList.add('enchantment-table'); 

    // テーブルヘッダー (<thead>) を作成
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // ヘッダーとその対応するソートキー (tradeableを追加)
    const headers = [
        { text: 'Enchantment Name', key: 'name' },
        { text: 'Max Level', key: 'max_level' },
        { text: 'Treasure?', key: 'is_treasure' },
        { text: 'Minimum Price', key: 'min_price' },
        { text: 'Tradeable?', key: 'tradeable' } // 新しいヘッダー
    ];

    headers.forEach(headerInfo => {
        const th = document.createElement('th');
        th.textContent = headerInfo.text;
        th.dataset.sortKey = headerInfo.key;
        th.classList.add('sortable-header');

        if (headerInfo.key === currentSortColumn) {
            th.classList.add(currentSortDirection);
        }

        th.addEventListener('click', () => {
            if (currentSortColumn === headerInfo.key) {
                currentSortDirection = (currentSortDirection === 'asc' ? 'desc' : 'asc');
            } else {
                currentSortColumn = headerInfo.key;
                currentSortDirection = 'asc';
            }
            // allEnchantments は元のデータなので、そのまま渡す (価格計算は displayEnchantmentList 内で行われる)
            initializeEnchantmentList(targetElementId, null, null, allEnchantments); 
        });
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tableElement.appendChild(thead);

    // テーブルボディ (<tbody>) を作成
    const tbody = document.createElement('tbody');
    sortedEnchantments.forEach(enchantment => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = enchantment.name;
        row.appendChild(nameCell);

        const levelCell = document.createElement('td');
        levelCell.textContent = toRoman(enchantment.max_level);
        row.appendChild(levelCell);

        const treasureCell = document.createElement('td');
        treasureCell.textContent = enchantment.is_treasure ? 'Yes' : 'No';
        if (enchantment.is_treasure) {
            treasureCell.classList.add('is-treasure');
        }
        row.appendChild(treasureCell);

        // 最小価格セルを追加
        const priceCell = document.createElement('td');
        priceCell.textContent = enchantment.min_price === 'N/A' ? 'N/A' : enchantment.min_price; // N/Aの表示
        row.appendChild(priceCell);

        // Tradeable? セルを追加
        const tradeableCell = document.createElement('td');
        tradeableCell.textContent = enchantment.tradeable ? 'Yes' : 'No';
        if (!enchantment.tradeable) {
            tradeableCell.classList.add('not-tradeable'); // CSSで強調するため
        }
        row.appendChild(tradeableCell);

        tbody.appendChild(row);
    });
    tableElement.appendChild(tbody);

    targetElement.appendChild(tableElement);
}

// JSONデータを読み込み、初期表示を行う関数
function initializeEnchantmentList(targetElementId, jsonFilePath, sortSelectId, initialData = null) {
    if (initialData) {
        displayEnchantmentList(initialData, targetElementId);
        return;
    }

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(enchantments => {
            allEnchantments = enchantments; 
            displayEnchantmentList(allEnchantments, targetElementId); 
        })
        .catch(error => {
            console.error('Error fetching enchantment data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Failed to load enchantment data. Please check the file path.';
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.appendChild(errorMessage);
            } else {
                document.body.appendChild(errorMessage);
            }
        });
}

let allEnchantments = []; 

document.addEventListener('DOMContentLoaded', function() {
    initializeEnchantmentList('enchantment-list', '../json/minecraft-enchantments.json', null);
});