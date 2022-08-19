import axios from "axios"
import React, { ReactNode } from "react"
import Layout from "../../components/Layout"
import styles from "../../styles/delete.module.css"

const Delete = () => {

  type option = {
    id: number,
    name: string,
  }

    type deleteId = {
      id: number
    }

  const options: option[] = [
    {id: 1, name: "test1",},
    {id: 2, name: "test2",},
    {id: 3, name: "test3",},
    {id: 4, name: "test4",},
  ]

  const lineDelete = async () => {
    console.log("期限切れを削除")
  }

  const lsitDelete = async () => {
    const list: any = document.getElementsByName("checkbox")

    for (var i = 0; i < list.length; i++) {
      if (list[i].checked) {
        // 削除API
        const url = `localhost/foods/${list[i].value}`
        // const foodDelete = await axios.delete(url)
        console.log(url)

      }
    } 

    // リスト再取得
    const url = "localhost/foods"
    // const itemList = await axios.get(url)

  }

  return (
    <>
      <Layout>
      <h1>食材削除</h1>

      <div className='delete'>
        <div className={styles.itemContainer}>
          {options.map((val, i) => {
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

            <button onClick={lineDelete}>期限切れ削除</button>
            <button onClick={lsitDelete}>選択したものを削除</button>
      </div>
        
      </Layout>
    </>
  )
}

export default Delete


export const getServerSideProps = async () => {
  
  return {
    props: {
      data: "getServerSidePropsから受け取った"
    },
  };
}