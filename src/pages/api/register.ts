// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'
import { FormTypes } from '../../types/user'

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).send('Unsupported method')
  const body: FormTypes = req.body
  try {
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    })
    res.status(200).send('User created successfully!')
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default register
