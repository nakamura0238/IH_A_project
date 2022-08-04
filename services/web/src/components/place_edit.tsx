import React from "react"

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

type props = {
  place: place
}


const PlaceEdit:React.FC<props> = ({place}) => {
  return (
    <div>
      <div>
        <h1>保存場所編集モーダル</h1>
        <form>
          <p>保存場所名</p>
          <input type="text" />
        </form>
      </div>
    </div>
  )
}

export default PlaceEdit