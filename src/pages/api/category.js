import { client } from "src/libs/client";

const handler = async (req, res) => {
  console.log(req.body);

  const data = await client.get({
    endpoint: "articles",
    queries: { filters: `category[equals]${req.body.id}` },
  });

  res.status(200).json(data);
};

export default handler;
