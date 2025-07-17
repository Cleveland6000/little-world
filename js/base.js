
/**
 * 数値を指定されたカスタムアルファベットの文字列にエンコードします。
 * @param {number} num エンコードする数値。
 * @param {string} alphabet 使用するアルファベット文字列。
 * @returns {string} エンコードされた文字列。
 */
function encodeToBase(num, alphabet) {
  if (num === 0) {
    return alphabet[0];
  }

  let encodedString = "";
  const base = alphabet.length;

  while (num > 0) {
    encodedString = alphabet[num % base] + encodedString;
    num = Math.floor(num / base);
  }

  return encodedString;
}

/**
 * カスタムアルファベットの文字列を数値にデコードします。
 * @param {string} str デコードする文字列。
 * @param {string} alphabet 使用するアルファベット文字列。
 * @returns {number} デコードされた数値。
 */
function decodeFromBase(str, alphabet) {
  let decodedNum = 0;
  const base = alphabet.length;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const value = alphabet.indexOf(char);

    if (value === -1) {
      throw new Error(`無効な文字: ${char} は指定されたアルファベットに含まれていません。`);
    }

    decodedNum = decodedNum * base + value;
  }

  return decodedNum;
}
