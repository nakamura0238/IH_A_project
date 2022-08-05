import styles from '../styles/Home.module.css'
import Image from 'next/image'



const Icon = () => {
  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <h1 className={styles.title}>
          食材一覧
        </h1>

        <span className={styles.icon}>

            <button className={styles.button}>
              <Image src="/veg.png" alt="veg" width={80} height={80} objectFit="contain" />
            </button>
            <button className={styles.button}>
              <Image src="/meat.png" alt="meat" width={80} height={80} objectFit="contain" />
            </button>
            <button className={styles.button}>
              <Image src="/fruits.png" alt="fruits" width={80} height={80} objectFit="contain" />
            </button>
            <button className={styles.button}>
              <Image src="/fish.png" alt="fish" width={80} height={80} objectFit="contain" />
            </button>

        </span>

      </main>

    </div>
  )
}

export default Icon
