import axios from "axios"
import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import React, { ReactNode, useState } from "react"
import Layout from "../../components/Layout"
import styles from "../../styles/delete.module.css"

const Delete = (props: any) => {

  const [foods, setFoods] = useState(props.foods)

  type option = {
    id: number,
    name: string,
  }

    // type deleteId = {
    //   id: number
    // }

  const options: option[] = [
    {id: 1, name: "test1",},
    {id: 2, name: "test2",},
    {id: 3, name: "test3",},
    {id: 4, name: "test4",},
  ]

  // const lineDelete = async () => {
  //   console.log("期限切れを削除")
  // }

  const lsitDelete = async () => {
    const list: any = document.getElementsByName("checkbox")
    const myCookie = getCookie();
    const headers = {
      headers: {
        Authorization: `Bearer ${myCookie.AuthToken}`,
      },
    };

    for (var i = 0; i < list.length; i++) {
      if (list[i].checked) {
        // 削除API
        const url = `http://localhost:3001/api/v1/foods/${list[i].value}`
        // const foodDelete = await axios.delete(url)
        const foods = await axios.delete(url, headers);
        console.log(url)
        console.log(foods)

      }
    } 

    // リスト再取得
    const url = "http://localhost:3001/api/v1/foods"
    const foodList = await axios.get(url, headers);
    setFoods(foodList.data.foods)


  const checkbox1:any  = document.getElementsByName("checkbox")


    for(i = 0; i < checkbox1.length; i++) {
      checkbox1[i].checked = false
    }

    // const itemList = await axios.get(url)

  }

  return (
    <>
      <Layout>
        <main className={styles.main}>
          <h1>食材削除</h1>

          <div className={styles.itemContainer}>
            {foods.map((val:any, i:any) => {
              return (
                <label key={i}>
                  <div className={styles.item}>
                    <input type="checkbox" name="checkbox" value={val.id} />
                    {val.name}
                  </div>
                </label>
              )
            })}
          </div>

          <button className={styles.btn} onClick={lsitDelete}>選択したものを削除</button>

        </main>
      </Layout>
    </>
  )
}

export default Delete


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
    console.log("res", foodsData)

  return {
    props: {
      foods: foodsData,
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