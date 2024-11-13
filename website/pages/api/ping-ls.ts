import {
  getAuthenticatedUser,
  lemonSqueezySetup,
} from '@lemonsqueezy/lemonsqueezy.js'

const apiKey = process.env.LEMON_SQUEEZY_API

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error('Error!', error),
})

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error('Error!', error),
})

export default async (req, res) => {
  try {
    const response = await getAuthenticatedUser()

    const authUserEmail = response.data.data.attributes.email

    res.json({
      userEmail: authUserEmail,
      isTestMode: response.data.meta.test_mode,
    })
  } catch (e) {
    res.json({
      message: 'error',
    })
  }
}
