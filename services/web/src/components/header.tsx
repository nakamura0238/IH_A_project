import Link from "next/link"
import styles from "../styles/header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={"/user"}>
        <a className={styles.nav_item}>
          user
        </a>
      </Link>
      <Link href={"/foods"}>
        <a className={styles.nav_item}>
          foods
        </a>
      </Link>
      <Link href={"/foods/place"}>
        <a className={styles.nav_item}>
          place
        </a>
      </Link>
      <Link href={"/foods/delete"}>
        <a className={styles.nav_item}>
          delete
        </a>
      </Link>
    </header>
  )
}

export default Header