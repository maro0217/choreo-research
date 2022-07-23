import { client } from "../../libs/client";

const handler = async (req, res) => {
    console.log(req.body);
    
    const data = await client.get({
        endpoint: 'blog',
        queries: {q: `${req.body.q}`}
      })
    console.log(data);
}

export default handler
