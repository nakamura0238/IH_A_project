import axios from "axios"
import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import styles from "../../styles/place.module.css"

const Place = (props: any) => {
  const [places, setPlaces] = useState(props.place)
  
  useEffect(() => {
    setDesable()
  }, [])

  // ボタン非活性処理
  const setDesable = () => {
    const nodeList = document.getElementById("placeList")
    const btnList = nodeList?.getElementsByTagName('button')
    if (btnList != undefined) {
      for (let i = 0; i < btnList.length; i++) {
        btnList[i].disabled = true
      }
    }
  }
  
  // 入力時処理
  const changeName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const next: HTMLButtonElement = e.currentTarget.nextElementSibling as HTMLButtonElement
    if (e.currentTarget.value != name) {
      console.log(e.currentTarget)
      console.log(e.currentTarget.nextElementSibling)
      next.disabled = false
    } else {
      next.disabled = true
      console.log("一致")
    }
  }

  // 変更ボタン押下処理
  const changeNameSubmit = async (inputName: number, name: string) => {
    console.log("aaaa")
    const hoge =  document.getElementsByName(`${inputName}`)
    const text = hoge[0] as HTMLInputElement

    const myCookie = getCookie();
    const headers = {
      headers: {
        Authorization: `Bearer ${myCookie.AuthToken}`,
      },
    };

    if (text.value != name) {
      console.log(text.value)

      const putPlace = {
        placeId: text.name,
        name: text.value,
      }
      console.log(putPlace)

      const url = `http://localhost:3001/api/v1/foods/places/${text.name}`
      const res = await axios.put(url, putPlace, headers)
      const placeRes = await axios.get("http://localhost:3001/api/v1/foods/places", headers)

      console.log("placeRes", placeRes.data)
      let hoge = placeRes.data.places
      hoge.shift()
      setPlaces(hoge)
      setDesable()
    } else {
      console.log("一致")
    }

  }

  return (
    <Layout>
      <main className={styles.main}>
        <h1>保存場所</h1>
        <div id="placeList" className={styles.itemContainer}>
          {places.map((val:any, i:any) => {
            return (
              <div key={i} className={styles.item}>
                <input type={"text"} name={`${val.id}`} autoComplete="off" onChange={(e) => changeName(e, val.name)} defaultValue={val.name}></input>
                <button onClick={(e) => changeNameSubmit(val.id, val.name)}>更新</button>
              </div>
            )
          })}

        </div>
      </main>
    </Layout>
  )
}

export default Place



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

    const places = await axios.get('http://app:3001/api/v1/foods/places', headers);
    let placeData = places.data.places;
    console.log("res", placeData)
    placeData.shift()


  return {
    props: {
      place: placeData,
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



