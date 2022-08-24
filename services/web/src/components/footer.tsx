import Link from "next/link"
import { useRouter } from "next/router"
import { destroyCookie } from "nookies"
import { useState } from "react"
import styles from "../styles/footer.module.css"

const Footer = () => {

  const [logout, setLogout] = useState(false)

  const route = useRouter()

  const logoutModal = () => {
    setLogout(!logout)
  }

  const logoutAct = () => {
    destroyCookie(undefined, 'AuthToken')
    route.push("/")
  }

  return (
    <footer className={styles.footer}>
      {
        logout ? 
          <div className={styles.logout}>
            <button onClick={logoutAct}>ログアウトする</button>
          </div>
        :undefined
      }
      <button onClick={logoutModal} className={styles.nav_item}>
        LOGOUT
      </button>
      <Link href={"/foods"}>
        <a className={styles.nav_item}>
          FOODS
        </a>
      </Link>
      <Link href={"/foods/place"}>
        <a className={styles.nav_item}>
          PLACE
        </a>
      </Link>
      <Link href={"/foods/delete"}>
        <a className={styles.nav_item}>
          DELETE
        </a>
      </Link>
    </footer>
  )
}

export default Footer