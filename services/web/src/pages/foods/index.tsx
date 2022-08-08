import Footer from "../../components/footer"
import Icon from "../../components/icon"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, { useState } from "react"
import All from "../../components/Item"
import Layout from "../../components/Layout"

const Item = [
  {
    id: 1, name:"にんじん", line:"3/4"
  },
  {
  id: 2,  name:"ぶどう", line:"4/5"
  },
  {
    id: 3, name:"鶏肉", line:"12/12"
  }
]

const Foods = () => {
  const [showAddFlg, setShowAddFlg] = useState(false)
  const [showDetailFlg, setShowDetailFlg] = useState(false)
  const [itemData, setItemData] = useState<any>({})

  const showDetail = (itemData: any) => {
    setItemData(itemData)
    setShowAddFlg(false)
    setShowDetailFlg(true)
  }
  const closeDetail = (): void => setShowDetailFlg(false)


  const showAdd = () => {
    setShowDetailFlg(false)
    setShowAddFlg(true)
  }
  const closeAdd = (): void => setShowAddFlg(false)

  return (
    <div>
      <Head>
        <title>一覧</title>
      </Head>

      <Layout>
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

          {/* <All /> */}

          
          {Item.map((item, i) => {
            return (
              <button key={i} onClick={() => showDetail(item)}>
                <p>{item.name} {item.line}</p>
              </button>
            )
          })}

          <button onClick={showAdd}>add item</button>

          {
            showDetailFlg? 
              <ShowDetailModal itemData={itemData} closeAction={closeDetail}/>
            : undefined
          }

          {
            showAddFlg? 
              <ShowAddModal itemData={itemData} closeAction={closeAdd}/>
            : undefined
          }

        </main>
      </Layout>
    </div>
  )
}


export default Foods

type props = {
  itemData: any,
  closeAction: () => void
}

export const ShowDetailModal: React.FC<props> = ({itemData, closeAction}) => {
  return (

    <div id="overlay">
      <div id="content">

        <h1>食材詳細</h1>
        <div className='a1'>
          <p>食材名：{itemData.name}</p>
          <p>消費期限：{itemData.line}</p>
          <p>保存場所：</p>
          <p>コメント：</p>
          <p>アイコン：</p>
          <div className='image'>
            {/* <img src={logo1} alt="果物" width="50" height="50" />
            <img src={logo2} alt="野菜" width="50" height="50"/>
            <img src={logo3} alt="肉" width="50" height="50" />
            <img src={logo4} alt="魚" width="50" height="50" /> */}
          </div>

          <p>おすすめレシピ：</p>
        </div>
        <button onClick={closeAction}>Close</button>
      </div>
    </div >

  )
}

export const ShowAddModal: React.FC<props> = ({closeAction}) => {
  return (
    <div id={styles.overlay}>
      <div id={styles.content}>
        <h2 className={styles.title}>食材を追加</h2>

        <div className={styles.icon}>
          <Image className={styles.img} src='/veg.png' width={70} height={70} alt=""></Image>
          <Image className={styles.img} src='/fruits.png' width={70} height={70} alt=""></Image>
          <Image className={styles.img} src='/fish.png' width={70} height={70} alt=""></Image>
          <Image className={styles.img} src='/meat.png' width={70} height={70} alt=""></Image>
        </div>

        <form action="#" method="get">
          <input className={styles.inputText} type="text" placeholder='食材名'/> <br />
          <input className={styles.inputText} type="text" placeholder='消費期限'/> <br />
          <input className={styles.inputText} type="text" placeholder='保存場所'/> <br />
          <textarea className={styles.textarea} name="textarea" id="" placeholder='コメント'></textarea><br />
          <input className={styles.inputButton} type="submit" value={'食材を追加'}/>
        </form>

        <button onClick={closeAction}>close</button>
      </div>
    </div>

  )
}