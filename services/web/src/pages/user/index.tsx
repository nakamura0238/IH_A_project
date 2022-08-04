const User = () => {
  return (
    <>
      ユーザートップページ
      <p>メールアドレス</p>
      <p>example@mail.com</p>
      <button onClick={() => {
        alert("line連携")
      }}>line連携</button>

      <button>ログアウト</button>
    </>
  )
}

export default User