import { client } from "libs/client";

const Search = async (req, res) => {
  console.log(req.body);

  const data = await client.get({
    endpoint: "articles",
    queries: { q: `${req.body.q}` },
  });

  res.status(200).json(data);
};

export default Search;
