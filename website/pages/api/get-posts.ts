import clientPromise from "../../lib/mongodb/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);

    const posts = await db.collection("posts").find({}).limit(20).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
