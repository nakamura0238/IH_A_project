import { useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

import line from "@line/bot-sdk"
import type {Message} from "@line/bot-sdk"


const LineAuth = () => {

  const route = useRouter();

  useEffect(() => {

  }, [])

  const getToken = async () => {

    // アクセストークンの発行
    var params = new URLSearchParams()
    params.append('grant_type', "authorization_code")
    params.append('code', route.query.code as string)
    params.append('redirect_uri', "http://localhost:3000/line")
    params.append('client_id', "1657234815")
    params.append('client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET as string)

    const token = await axios.post("https://api.line.me/oauth2/v2.1/token", params);
    console.log("token: ", token.data)

    // トークンの検証
    var params_second = new URLSearchParams()
    params_second.append("id_token", token.data.id_token)
    params_second.append("client_id", "1657234815")
    const userdata = await axios.post("https://api.line.me/oauth2/v2.1/verify", params_second);
    console.log("userdata: ", userdata.data)


    const data = {
      params: {
        to: userdata.data.sub
      }
    }

    const result = await axios.get('/api/hello', data)
    console.log(result)

  }

  return (
    <>
      <button onClick={getToken}>access token</button>
    </>
  )
}

export default LineAuth