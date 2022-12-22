import { NextApiRequest, NextApiResponse } from 'next'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send(req.method + ' is not suppoted')
  }
  const session = await getServerAuthSession({ req, res })
  // if (!session) return res.status(401).send('Unauthorized')

  return res.send('dsfd')

  // if (!file)
  //   return res
  //     .status(400)
  //     .send('file field is required in JSON body as File type')
  // const result = await cloudinary.uploader.upload(file, {
  //   folder: 'carrent',
  // })
  // res.json(result)
}
export default upload

export const config = {
  api: {
    bodyParser: false,
  },
}
