// mysql2モジュールのpromiseを取り込む
const mysql = require('mysql2/promise');

// DB接続設定
const dbConfig = {
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'nodejs_db_kadai'
};

// DB接続プールを作成
const pool = mysql.createPool(dbConfig);

// DB接続プールを破棄
async function closePool() {
  try {
    await pool.end();
    console.log('データベース接続プールを破棄しました。');
  } catch (err) {
    console.error('データベース接続プールの破棄中にエラーが発生しました。;', err);
  }
}

// SQL文を実行
async function executeQuery(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// モジュールとしてエクスポート
module.exports = {
  closePool,
  executeQuery
};