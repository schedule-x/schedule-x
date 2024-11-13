import clientPromise from '../../lib/mongodb/mongodb'
import {
  lemonSqueezySetup,
  validateLicense,
} from '@lemonsqueezy/lemonsqueezy.js'

const apiKey = process.env.LEMON_SQUEEZY_API

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error('Error!', error),
})

const LICENSE_KEY_COLLECTION_NAME = 'license_keys'
const ACCESS_TOKEN_COLLECTION_NAME = 'sx_access_tokens'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGO_DB_NAME)
    const parsedBody = JSON.parse(req.body)
    const alreadyUsedKey = await db
      .collection(LICENSE_KEY_COLLECTION_NAME)
      .findOne({
        key: parsedBody.key,
      })

    if (alreadyUsedKey) {
      return res.json({
        message:
          "Key already used. If you can't find your token, please contact support at tom@schedule-x.dev",
        status: 400,
      })
    }

    const response = await validateLicense(parsedBody.key)

    if (!response.data.valid) {
      return res.json({
        message: 'Key is invalid',
        status: 400,
      })
    }

    const availableToken = await db
      .collection(ACCESS_TOKEN_COLLECTION_NAME)
      .findOne()

    await db.collection(LICENSE_KEY_COLLECTION_NAME).insertOne({
      key: parsedBody.key,
      email: response.data.meta.customer_email,
      accessToken: availableToken.token,

      // name needed to identify the token in the registry server
      accessTokenName: availableToken.name || 'n/a',
    })

    await db
      .collection(ACCESS_TOKEN_COLLECTION_NAME)
      .deleteOne({ token: availableToken.token })

    res.json({
      message: 'Key successfully validated',
      status: 200,
      token: availableToken.token,
    })
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
