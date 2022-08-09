import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "choreo354",
  apiKey: process.env.API_KEY || "",
});
