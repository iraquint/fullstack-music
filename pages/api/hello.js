// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Any file in page/api is an api route

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
