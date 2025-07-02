import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthenticatedUser,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";

const apiKey = process.env.LEMON_SQUEEZY_API;

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});

export async function GET(request: NextRequest) {
  try {
    const response = await getAuthenticatedUser()

    if (!response.data) {
      return NextResponse.json({
        message: 'No data received from Lemon Squeezy',
      }, { status: 500 });
    }

    const authUserEmail = response.data.data.attributes.email

    return NextResponse.json({
      userEmail: authUserEmail,
      isTestMode: response.data.meta.test_mode,
    });
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      message: 'error',
    }, { status: 500 });
  }
} 