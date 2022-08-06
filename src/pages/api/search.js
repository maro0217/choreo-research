import { client } from "src/libs/client";

const Search = async (req, res) => {
  console.log(req.body);

  const data = await client.get({
    endpoint: "blog",
    queries: { q: `${req.body.q}` },
  });

  res.status(200).json(data);
};

export default Search;
