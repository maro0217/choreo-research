import { client } from "src/libs/client";

const Search = async (req, res) => {
  const data = await client.get({
    endpoint: "articles",
    queries: { q: `${req.body.q}` },
  });

  res.status(200).json(data);
};

export default Search;
