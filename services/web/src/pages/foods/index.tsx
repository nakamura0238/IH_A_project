import Footer from "../../components/footer"
import Icon from "../../components/icon"
import Head from 'next/head'
import Image from 'next/image'
import modal from '../../styles/modal.module.css'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from "react"
import All from "../../components/Item"
import Layout from "../../components/Layout"
import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import axios from "axios"
import { url } from "inspector"
import Link from "next/link"



const Foods = (props: any) => {


  const [showAddFlg, setShowAddFlg] = useState(false)
  const [showDetailFlg, setShowDetailFlg] = useState(false)
  const [itemData, setItemData] = useState<any>({})

  const allCategory = props.cat.categories
  const icons = props.cat.icons
  const [currentIcon, setCurrentIcon] = useState(1)
  const [foods, setFoods] = useState(props.foods)
  const [category, setCategory] = useState(props.defaultCat)
  const [plData, setPlData] = useState(props.place)

  const showDetail = (itemData: any) => {
    setCategory(props.defaultCat)
    setCurrentIcon(1)
    setItemData(itemData)
    setShowAddFlg(false)
    setShowDetailFlg(true)
  }
  const closeDetail = (): void => setShowDetailFlg(false)


  const showAdd = () => {
    setCategory(props.defaultCat)
    setShowDetailFlg(false)
    setShowAddFlg(true)
  }
  const closeAdd = (): void => setShowAddFlg(false)


  type Props = {
    itemData: any,
    closeAction: () => void
  }

  // food詳細
  const ShowDetailModal: React.FC<Props> = ({itemData, closeAction}) => {

    const [recipe, setRecipe] = useState([])

    useEffect (() => {
      const getRecipe = async () => {
        const url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=" + itemData.categoryId + "&applicationId=1064732730884530181";
        const hoge = await axios.get(url)
        setRecipe(hoge.data.result)
      }
      if (itemData.categoryId != 0) {
        getRecipe()
      }
      console.log(recipe)
    }, [itemData.categoryId, recipe])

    const date = new Date(itemData.expirationDate)
    const  yyyy = date.getFullYear();
    const  mm = ("0"+(date.getMonth()+1)).slice(-2);
    const  dd = ("0"+date.getDate()).slice(-2);
    const defaultDate = yyyy+'-'+mm+'-'+dd;

    const currentIcon = allCategory.filter((val:any) => val.id == itemData.categoryId )[0]
    const currentCategory = allCategory.filter((val: any) => val.iconId == currentIcon.iconId )
    
    const foo = icons.filter((val: any) => val.id == currentIcon.iconId)[0]

    const updateSubmit = async () => { 
      const doc: any = document.getElementById("updateForm")
      const categoryNum = doc.categoryID.selectedIndex
      
      const fuga = document.querySelectorAll("#categoryID option")
      // console.log(fuga[categoryNum])

      // console.log("categoryName", categoryNum)
      const name = doc.name.value
      const categoryName = fuga[categoryNum].innerHTML
      const categoryId = doc.categoryID.value
      const expirationDate = new Date(doc.expirationDate.value).getTime()
      const place = doc.place.value
      const placeSelect = doc.placeSelect.value
      const comment = doc.comment.value

      // console.log(categoryId)
      // console.log(name)
      // console.log(expirationDate)
      // console.log(placeSelect)
      // console.log(comment)

      const myCookie = getCookie();
      const headers = {
        headers: {
          Authorization: `Bearer ${myCookie.AuthToken}`,
        },
      };

      let obj = {
        "name": name,
        "expirationDate": expirationDate,
        "comment": comment,
        "placeId": placeSelect,
        "categoryId": categoryId
      }

      if (!name) {
        // カテゴリーネームを設定
        obj.name = categoryName
      }


      // 保存場所未選択
      if (placeSelect == 1) {
        if (place) {
          const insert = await axios.post("http://localhost:3001/api/v1/foods/places", {name: place}, headers)
          obj.placeId = insert.data.id

        } else {
          // id:1を設定
        }
      }

      // console.log(obj)

      const add = await axios.put(`http://localhost:3001/api/v1/foods/${itemData.id}`, obj, headers)
      const list = await axios.get("http://localhost:3001/api/v1/foods", headers)

      setFoods(list.data.foods)
      closeDetail()

    }

    return (

      <div className={modal.overlay} onClick={closeAction}>
        <div className={modal.content} onClick={(e) => e.stopPropagation()}>

          <h2>食材詳細</h2>
          <div className='image'>
            <button className={currentIcon == foo.id ? `currentIcon ${styles.button}`: styles.button}>
              <Image className={modal.img} src={`/${foo.imagePath}`} width={36} height={36} alt="" />
            </button>
          </div>

          <form id="updateForm" >
            <p>カテゴリ</p>
            <select name="categoryID" id="categoryID" defaultValue={itemData.categoryId}>
              {
                currentCategory.map((val: any, i:any) => {
                  return (
                    <option key={i} value={val.id}>{val.name}</option>
                  )
                })
              }
            </select>
            <br />

            <p>食材名</p>
            <input className={modal.inputText} name="name" type="text" placeholder='食材名' defaultValue={itemData.name} autoComplete="off"/> <br />
            <p>消費期限</p>
            <input className={modal.inputText} name="expirationDate" type="date" placeholder='消費期限' defaultValue={`${defaultDate}`} autoComplete="off"/> <br />
            <p>保存場所</p>
            <input className={modal.inputText} name="place" type="text" placeholder='新規登録' autoComplete="off"/>
            <br />
            <select name="placeSelect" id=""  defaultValue={itemData.placeId}>
              <option value="1">未選択</option>
              {
                plData.map((val: any, i: any) => {
                    return (
                    <option key={i} value={val.id}>{val.name}</option>
                    )
                })
              }
            </select>
            <br />
            <p>コメント</p>
            <textarea className={modal.textarea} name="comment" placeholder='コメント' defaultValue={itemData.comment}></textarea><br />
          </form>

          <div className={modal.btnList}>
            <button onClick={closeAction}>Close</button>
            <button className={modal.addbtn} value={'食材を追加'} onClick={updateSubmit}>更新</button>
          </div>

            <p>おすすめレシピ：</p>
            <div className={modal.recipe}>
              {recipe.map((val:any, i) => {
                return (
                  <Link href={val.recipeUrl} key={i}>
                    <div className={modal.recipeItem}>
                      <Image src={val.foodImageUrl} width={100} height={70} alt="" objectFit={"cover"}></Image>
                      <p>{val.recipeTitle}</p>
                    </div>

                  </Link>
                )
              })}
              
          </div>
        </div>
      </div>

    )
  }


  // food追加
  const ShowAddModal: React.FC<Props> = ({closeAction}) => {

    const  date = new Date();
    const  yyyy = date.getFullYear();
    const  mm = ("0"+(date.getMonth()+1)).slice(-2);
    const  dd = ("0"+date.getDate()).slice(-2);
    const day = yyyy+'-'+mm+'-'+dd;

    const addSubmit = async () => { 
      const doc: any = document.getElementById("addForm")
      const categoryId = doc.categoryID.value
      const categoryNum = doc.categoryID.selectedIndex
      
      const fuga = document.querySelectorAll("#categoryID option")
      // console.log(fuga[categoryNum].innerHTML)

      // console.log("categoryName", categoryNum)
      const name = doc.name.value
      const categoryName = fuga[categoryNum].innerHTML
      const expirationDate = new Date(doc.expirationDate.value).getTime()
      const place = doc.place.value
      const placeSelect = doc.placeSelect.value
      const comment = doc.comment.value

      const myCookie = getCookie();
      const headers = {
        headers: {
          Authorization: `Bearer ${myCookie.AuthToken}`,
        },
      };

      let obj = {
        "name": name,
        "expirationDate": expirationDate,
        "comment": comment,
        "placeId": placeSelect,
        "categoryId": categoryId
      }

      if (!name) {
        // カテゴリーネームを設定
        obj.name = categoryName
      }


      // 保存場所未選択
      if (placeSelect == 1) {
        if (place) {
          const insert = await axios.post("http://localhost:3001/api/v1/foods/places", {name: place}, headers)
          obj.placeId = insert.data.id

        } else {
          // id:1を設定
        }
      }

      const add = await axios.post("http://localhost:3001/api/v1/foods", obj, headers)
      const list = await axios.get("http://localhost:3001/api/v1/foods", headers)


      setFoods(list.data.foods)
      closeAdd()

    }

    const selectIcon = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: any) => {
      const hoge = allCategory.filter((val: any) => val.iconId == id )
      setCategory(hoge)
    }

    return (
      <div className={modal.overlay} onClick={closeAction}>
        <div className={modal.content} onClick={(e) => e.stopPropagation()}>

          <h2 className={modal.title}>食材を追加</h2>
          <div className={modal.icons}>
            {
              icons.map((val: any, i: any) => {
                return (
                  <button key={i} className={styles.button} onClick={(e) => {selectIcon(e, val.id)}}>
                    <Image className={modal.img} src={`/${val.imagePath}`} width={36} height={36} alt="" />
                  </button>
                )
              })
            }
          </div>

          <form id="addForm">
            <p>カテゴリ</p>
            <select name="categoryID" id="categoryID">
              {
                category.map((val: any, i:any) => {
                  return (
                    <option key={i} value={val.id}>{val.name}</option>
                  )
                })
              }
            </select>
            <br />

            <p>食材名</p>
            <input className={modal.inputText} name="name" type="text" placeholder='食材名' autoComplete="off"/>
            <br />
            <p>消費期限</p>
            <input className={modal.inputText} id="date" name="expirationDate" type="date" placeholder='消費期限' defaultValue={day} autoComplete="off"/>
            <br />
            <p>保存場所</p>
            <input className={modal.inputText} name="place" type="text" placeholder='保存場所' autoComplete="off"/>
            <br />
            <select name="placeSelect" id="">
              <option value="1">未選択</option>
              {
                plData.map((val: any, i: any) => {
                    return (
                      val.name != "" ? <option key={i} value={val.id}>{val.name}</option>
                      : undefined
                    )
                })
              }
            </select>
            <br />
            <p>コメント</p>
            <textarea className={modal.textarea} name="comment" id="" placeholder='コメント'></textarea>
            <br />
          </form>

          <div className={modal.btnList}>
            <button onClick={closeAction}>閉じる</button>
            <button className={modal.addbtn} value={'食材を追加'} onClick={addSubmit}>食材を追加</button>
          </div>
        </div>
      </div>

    )
  }

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

          <div id="placeList" className={styles.itemContainer}>

            
            {foods.map((item:any, i: any) => {

              const date = new Date(item.expirationDate)
              const  yyyy = date.getFullYear();
              const  mm = ("0"+(date.getMonth()+1)).slice(-2);
              const  dd = ("0"+date.getDate()).slice(-2);
              const defaultDate = yyyy+'-'+mm+'-'+dd;

              return (
                <button key={i}  className={styles.item} onClick={() => showDetail(item)}>
                  <div>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.date}>{defaultDate}</p>
                  </div>
                  <p className={styles.comment}>{item.comment}</p>
                </button>
              )
            })}
          </div>

          <button className={styles.addbtn} onClick={showAdd}>＋</button>

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


const getCookie = (ctx?: NextPageContext) => {
  const cookie = parseCookies(ctx);
  return cookie;
};

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const myCookie = getCookie(context);
    const headers = {
      headers: {
        Authorization: `Bearer ${myCookie.AuthToken}`,
      },
    };

    const foods = await axios.get('http://app:3001/api/v1/foods', headers);
    const foodsData = foods.data.foods;
    // console.log("foodsData", foodsData)

    const cat = await axios.get('http://app:3001/api/v1/foods/icons', headers);
    const catData = cat.data;
    console.log("catData", catData)

    const pl = await axios.get('http://app:3001/api/v1/foods/places', headers);
    let plData = pl.data.places;
    // console.log("plData", plData)
    plData.shift()

    const hoge = catData.categories
    const defaultCat = hoge.filter((val: any) =>  val.iconId == 1 )

  return {
    props: {
      foods: foodsData,
      cat: catData,
      defaultCat: defaultCat,
      place: plData
    },
  };

  } catch (err: any) {
    // console.log(err)
    if (err.response) {
      // レスポンスありのエラーハンドリング（実際には必要に応じた例外処理を実装する）
      console.log(
        `Error! code: ${err.response.status}, message: ${err.message}`
      );
    } else {
      // レスポンスなしのエラーハンドリング（実際には必要に応じた例外処理を実装する）
      console.log(err.message);
    }

    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }


  }
  
}