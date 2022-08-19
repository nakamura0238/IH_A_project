import { useEffect, useState } from "react"
import Layout from "../../components/Layout"

type place = {
  id: number,
  userId: number,
  name: string
}

const place1: place[] = [
  {
    id: 1,
    userId: 1,
    name: "冷蔵庫"
  },
  {
    id: 3,
    userId: 1,
    name: "北の棚"
  },
  {
    id: 2,
    userId: 1,
    name: "パントリー"
  },
]

let places2: place[] = [
  {
    id: 1,
    userId: 1,
    name: "冷蔵庫"
  },
  {
    id: 3,
    userId: 1,
    name: "北の棚"
  },
  {
    id: 2,
    userId: 1,
    name: "パントリー"
  },
]





const Place = () => {
  const [places, setPlaces] = useState(place1)
  
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
  const changeNameSubmit = (inputName: number, name: string) => {
    console.log("aaaa")
    const hoge =  document.getElementsByName(`${inputName}`)
    const text = hoge[0] as HTMLInputElement

    if (text.value != name) {
      console.log(text.value)
      var found =  places2.findIndex(e => e.id == inputName);
      if (found) {
        places2[found].name = text.value
      }
      console.log(found);
      
    setPlaces(places2)
    setDesable()
    } else {
      console.log("一致")
    }

  }

  return (
    <Layout>
      <h1>保存場所管理ページ</h1>
      <div id="placeList">
        {places.map((val, i) => {
          return (
            <div key={i}>
              <input type={"text"} name={`${val.id}`} autoComplete="off" onChange={(e) => changeName(e, val.name)} defaultValue={val.name}></input>
              <button onClick={(e) => changeNameSubmit(val.id, val.name)}>更新</button>
            </div>
          )
        })}

      </div>
    </Layout>
  )
}

export default Place


export const getServerSideProps = async () => {
  
  return {
    props: {
      data: "getServerSidePropsから受け取った"
    },
  };
}