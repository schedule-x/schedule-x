import { NextRequest, NextResponse } from 'next/server';
import {
  lemonSqueezySetup,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API;

lemonSqueezySetup({
  apiKey: lemonSqueezyApiKey,
  onError: (error) => console.error("Error initializing the Lemon Squeezy client", error),
});

const STORE_ID = Number(process.env.STORE_ID);

export async function POST(request: NextRequest) {
  if (false === Number.isInteger(STORE_ID))  {
    return NextResponse.json({ message: "Invalid store ID" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const variantId = body.variantId;

    if (!variantId) {
      return NextResponse.json({ message: "Variant ID is required" }, { status: 400 });
    }

    const { data } = await createCheckout(STORE_ID, variantId);

    if (!data || !data.data || !data.data.attributes) {
      return NextResponse.json({ message: "Invalid response from Lemon Squeezy" }, { status: 500 });
    }

    return NextResponse.json({ 
      message: "Checkout created", 
      url: data.data.attributes.url 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 