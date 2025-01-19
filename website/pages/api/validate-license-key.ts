import clientPromise from "../../lib/mongodb/mongodb";
import {
  lemonSqueezySetup, validateLicense,
} from "@lemonsqueezy/lemonsqueezy.js";
import { Gitlab } from '@gitbeaker/rest';

const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API;
const gitlabToken = process.env.GITLAB_TOKEN;

lemonSqueezySetup({
  apiKey: lemonSqueezyApiKey,
  onError: (error) => console.error("Error!", error),
});

const gitlabApi = new Gitlab({
  token: gitlabToken,
  host: 'https://gitlab.schedule-x.com'
});

const LICENSE_KEY_COLLECTION_NAME = "license_keys";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);
    const parsedBody = JSON.parse(req.body);
    const alreadyUsedKey = await db.collection(LICENSE_KEY_COLLECTION_NAME).findOne({
      key: parsedBody.key,
    });

    if (alreadyUsedKey) {
      return res.json({
        message: "Key already used. If you can't find your token, please contact support at tom@schedule-x.dev",
        status: 400,
      });
    }

    const response =  await validateLicense(parsedBody.key)

    if (!response.data.valid) {
      return res.json({
        message: "Key is invalid",
        status: 400,
      });
    }

    const todayPlus364Days = new Date();
    todayPlus364Days.setDate(todayPlus364Days.getDate() + 364);
    const tokenExpiration = `${todayPlus364Days.getFullYear()}-${todayPlus364Days.getMonth() + 1}-${todayPlus364Days.getDate()}`;

    const { token } = await gitlabApi.GroupAccessTokens.create(
      44,
      response.data.meta.customer_email,
      ['read_api'],
      tokenExpiration
    )

    await db.collection(LICENSE_KEY_COLLECTION_NAME).insertOne({
      key: parsedBody.key,
      email: response.data.meta.customer_email,
      accessToken: token,

      // name needed to identify the token in the registry server
      accessTokenName: response.data.meta.customer_email || 'n/a',
    });

    res.json({
      message: "Key successfully validated",
      status: 200,
      token,
    })
  } catch (e) {
    console.error(e);
    res.json({
      message: e.message,
      status: 500
    })
  }
};
