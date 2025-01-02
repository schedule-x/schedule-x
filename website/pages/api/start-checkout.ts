import {
  lemonSqueezySetup,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import { NextApiRequest, NextApiResponse } from 'next'

const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API;

lemonSqueezySetup({
  apiKey: lemonSqueezyApiKey,
  onError: (error) => console.error("Error initializing the Lemon Squeezy client", error),
});

type ResponseData = {
  message: string
  url?: string
}

const STORE_ID = Number(process.env.STORE_ID);

export default async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (false === Number.isInteger(STORE_ID))  {
    return res.status(500).json({ message: "Invalid store ID" });
  }

  const variantId = req.body.variantId;

  if (!variantId) {
    return res.status(400).json({ message: "Variant ID is required" });
  }

  try {
    const { data } = await createCheckout(STORE_ID, variantId);

    return res.json({ message: "Checkout created", url: data.data.attributes.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
