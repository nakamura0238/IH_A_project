import Footer from "../../components/footer"
import Icon from "../../components/icon"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React from "react"
import All from "../../components/Item"



const Foods = () => {
  return (
    <div>
      <Head>
        <title>一覧</title>
      </Head>

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

        <All />

      </main>
    </div>
  )
}


export default Foods
