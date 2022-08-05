import Link from "next/link"

const Header = () => {
  return (
    <header>
      <Link href={"/user"}>
        user
      </Link><br />
      <Link href={"/foods"}>
        foods
      </Link><br />
      <Link href={"/foods/place"}>
        place
      </Link><br />
      <Link href={"/foods/delete"}>
        delte
      </Link><br />
    </header>
  )
}

export default Header