import Footer from "../../components/footer"
import Icon from "../../components/icon"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'


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

      </main>
    </div>
  )
}



//途中
type FoodItem = {
  food: string, line: string;
};
export const App = () => {
  const tables: FoodItem[] = [
    {line: 1, content: "ぶどう"},
    {line: 2, content: "にんじん"},
    {line: 3, content: "いちご"}
  ];

  return (
    <div className='list'>
      <ul className='food-list'>
        {tables.map((food: FoodItem) => {
          return (
            <li className='food-item' key={food.line}>
              <span className='food-item_text'>
                {food.line}

              </span>
            </li>
          )
        }

        )}

      </ul>


    </div>
  )
}

export default Foods
