import Layout from "../../components/Layout"

type place = {
  id: number,
  userId: number,
  name: string
}

const places: place[] = [
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



const changeName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
  if (e.currentTarget.value != name) {
    console.log(e.currentTarget)
    console.log(e.currentTarget.nextElementSibling)

  } else {
    console.log("一致")
  }
}


const Place = () => {
  return (
    <Layout>
      <h1>保存場所管理ページ</h1>
      {places.map((val, i) => {
        return (
          <div key={i}>
            <input type={"text"} onChange={(e) => changeName(e, val.name)} defaultValue={val.name}></input>
            <div>
              <button>削除</button>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default Place