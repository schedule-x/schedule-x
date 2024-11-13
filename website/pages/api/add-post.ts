import clientPromise from '../../lib/mongodb/mongodb'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGO_DB_NAME)
    const { title, content } = req.body

    const post = await db.collection('posts').insertOne({
      title: title || 'hello',
      content: content || 'world',
    })

    res.json(post)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
