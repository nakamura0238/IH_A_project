const Signup = () => {
  return (
    <>
      <h1>サインアップページ</h1>
      <form>
        <p>メールアドレス</p>
        <input type="text" />
        <p>パスワード</p>
        <input type="password" />
        <p>パスワード確認</p>
        <input type="password" />
        <button>登録</button>
      </form>
    </>
  )
}

export default Signup