import { useRouter } from "next/router"
import { destroyCookie, parseCookies } from "nookies"
import Layout from "../../components/Layout"
import styles from "../../styles/user.module.css"

const User = () => {

  const route = useRouter()

  const logout = () => {
    destroyCookie(undefined, 'AuthToken')
    route.push("/")

  }

  return (
    <Layout>
      <main>
        ユーザー情報
        <p>メールアドレス</p>
        <p>example@mail.com</p>
        {/* <button onClick={() => {
          alert("line連携")
        }}>line連携</button> */}
        {/* <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657234815&redirect_uri=http%3A%2F%2Flocalhost%3A3500%2Fline&state=12345abcde&scope=profile%20openid&nonce=09876xyz">
            line
        </a> */}

        <button onClick={logout}>ログアウト</button>
      </main>
    </Layout>
  )
}

export default User