import Footer from "../../components/footer"
import Icon from "../../components/icon"
import Head from 'next/head'
import Image from 'next/image'
import modal from '../../styles/modal.module.css'
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
                <Image src="/veg.png" alt="veg" width={50} height={50} objectFit="contain" />
              </button>
              <button className={styles.button}>
                <Image src="/meat.png" alt="meat" width={50} height={50} objectFit="contain" />
              </button>
              <button className={styles.button}>
                <Image src="/fruits.png" alt="fruits" width={50} height={50} objectFit="contain" />
              </button>
              <button className={styles.button}>
                <Image src="/fish.png" alt="fish" width={50} height={50} objectFit="contain" />
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

        </main>

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

  const date = new Date(1660953600000)
  const  yyyy = date.getFullYear();
  const  mm = ("0"+(date.getMonth()+1)).slice(-2);
  const  dd = ("0"+date.getDate()).slice(-2);
  const defaultDate = yyyy+'-'+mm+'-'+dd;

  const updateSubmit = () => { 
    const doc: any = document.getElementById("addForm")
    const name = doc.name.value
    const expirationDate = doc.expirationDate.value
    const place = doc.place.value
    const comment = doc.comment.value
    console.log(name)
    console.log(expirationDate)
    console.log(place)
    console.log(comment)
  }

  return (

    <div className={modal.overlay} onClick={closeAction}>
      <div className={modal.content} onClick={(e) => e.stopPropagation()}>

        <h1>食材詳細</h1>



        <form id="updateForm">
          <p>アイコン</p>
          <div className='image'>
            <button className={styles.button}>
              <Image className={modal.img} src='/veg.png' width={36} height={36} alt="" />
            </button>
            <button className={styles.button}>
              <Image className={modal.img} src='/fruits.png' width={36} height={36} alt="" />
            </button>
            <button className={styles.button}>
              <Image className={modal.img} src='/fish.png' width={36} height={36} alt="" />
            </button>
            <button className={styles.button}>
              <Image className={modal.img} src='/meat.png' width={36} height={36} alt="" />
            </button>
          </div>

          <p>食材名</p>
          <input className={modal.inputText} name="name" type="text" placeholder='食材名' defaultValue={itemData.name} autoComplete="off"/> <br />
          <p>消費期限</p>
          <input className={modal.inputText} name="expirationDate" type="date" placeholder='消費期限' defaultValue={`${defaultDate}`} autoComplete="off"/> <br />
          <p>保存場所</p>
          <input className={modal.inputText} name="place" type="text" placeholder='保存場所' defaultValue={itemData.name} autoComplete="off"/> <br />
          <p>コメント</p>
          <textarea className={modal.textarea} name="comment" placeholder='コメント' defaultValue={itemData.name}></textarea><br />
        </form>
        <button className={modal.inputButton} value={'食材を追加'} onClick={updateSubmit}>食材を追加</button>

        <div className='a1'>
          <p>おすすめレシピ：</p>
        </div>
        <button onClick={closeAction}>Close</button>
      </div>
    </div >

  )
}

export const ShowAddModal: React.FC<props> = ({closeAction}) => {

  const  date = new Date();
  const  yyyy = date.getFullYear();
  const  mm = ("0"+(date.getMonth()+1)).slice(-2);
  const  dd = ("0"+date.getDate()).slice(-2);
  const day = yyyy+'-'+mm+'-'+dd;

  const addSubmit = () => { 
    const doc: any = document.getElementById("addForm")
    const name = doc.name.value
    const expirationDate = new Date(doc.expirationDate.value).getTime()
    const place = doc.place.value
    const comment = doc.comment.value
    console.log(name)
    console.log(expirationDate)
    console.log(place)
    console.log(comment)
  }

  return (
    <div className={modal.overlay} onClick={closeAction}>
      <div className={modal.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={modal.title}>食材を追加</h2>

        <div className={modal.icon}>
          <Image className={modal.img} src='/veg.png' width={36} height={36} alt=""></Image>
          <Image className={modal.img} src='/fruits.png' width={36} height={36} alt=""></Image>
          <Image className={modal.img} src='/fish.png' width={36} height={36} alt=""></Image>
          <Image className={modal.img} src='/meat.png' width={36} height={36} alt=""></Image>
        </div>

        <form id="addForm">
          <input className={modal.inputText} name="name" type="text" placeholder='食材名' autoComplete="off"/> <br />
          <input className={modal.inputText} id="date" name="expirationDate" type="date" placeholder='消費期限' defaultValue={day} autoComplete="off"/> <br />
          <input className={modal.inputText} name="place" type="text" placeholder='保存場所' autoComplete="off"/> <br />
          <textarea className={modal.textarea} name="comment" id="" placeholder='コメント'></textarea><br />
        </form>
        <button className={modal.inputButton} value={'食材を追加'} onClick={addSubmit}>食材を追加</button>

        <button onClick={closeAction}>close</button>
      </div>
    </div>

  )
}


export const getServerSideProps = async () => {
  
  return {
    props: {
      data: "getServerSidePropsから受け取った"
    },
  };
}