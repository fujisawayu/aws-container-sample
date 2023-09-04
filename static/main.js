const buttonElement = document.getElementById('health-check')
const messageElement = document.getElementById('message')

buttonElement.addEventListener('click', async () => {
  messageElement.innerText = '接続チェック中...'

  try {
    const response = await fetch('/api/health')
    const responseBody = await response.json()
    const message = responseBody.message
    messageElement.innerText = message
  } catch (e) {
    messageElement.innerText = 'ブラウザ上の JavaScript でエラーが発生しました'
    throw e
  }
})
