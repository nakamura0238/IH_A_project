// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import * as line from "@line/bot-sdk"
import type {Message} from "@line/bot-sdk"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    if (req.method === 'GET') {
      // POSTリクエストを処理します
      const client = new line.Client({
        channelAccessToken: process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN as string
      })

      const message: Message = {
        type: 'text',
        text: 'Hello World!'
      };
      
      const aaaa = await client.pushMessage(req.query.to as string, message)

      res.json([req.query.to, aaaa])
    } else {
      // その他のHTTPメソッドを処理します
    }

  } catch (err) {
    res.send(err)
  }


}
