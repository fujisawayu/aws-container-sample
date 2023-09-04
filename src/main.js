const express = require('express')
const morgan = require('morgan')
require('express-async-errors')
const mysql = require('mysql2/promise')

// フレームワークの設定
const app = express()
const port = 8080
app.use(morgan('combined'))
app.use(express.static('static', { extensions: ['html'] }))
app.use(express.json())

// ヘルスチェック API を実装
app.get('/api/health', async (req, res) => {
  let connect
  try {
    // DB に接続
    connect = await mysql.createConnection({
      host: process.env.MYSQL_HOST ?? 'localhost',
      database: process.env.MYSQL_DATABASE ?? 'mydb',
      user: process.env.MYSQL_USER ?? 'myuser',
      password: process.env.MYSQL_PASSWORD ?? 'mypassword',
      connectTimeout: 3000
    })

    // SQL を実行
    await connect.execute('select 1')

    // 成功を返す。
    res.json({ message: 'OK' })
  } catch (e) {
    // エラーが発生した場合、エラーをログ出力して失敗を返す。
    console.error(e)
    res.status(503).json({
      message: 'データベースへの接続に失敗しました'
    })
  } finally {
    // データベースとの接続を終了
    if (connect) {
      await connect.end()
    }
  }
})

// アプリケーションを起動
app.listen(port, () => {
  console.log(`Sample app listening on port ${port}`)
})
