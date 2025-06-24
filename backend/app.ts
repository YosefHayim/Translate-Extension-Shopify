import "@shopify/shopify-api/adapters/node";

import { LATEST_API_VERSION, shopifyApi } from "@shopify/shopify-api";

import dotenv from "dotenv";
import express from "express";

dotenv.config();

const shopify = shopifyApi({
  apiKey: process.env.CLIENT_ID,
  apiVersion: LATEST_API_VERSION,
  apiSecretKey: process.env.CLIENT_SECRET,
  isEmbeddedApp: true,
  hostScheme: "http",
  scopes: ["read_products"],
  hostName: process.env.NGROK_TUNNEL!,
  logger: {
    log: async (severity, message) => {
      console.log(`Logs recieved: ${message} | ${severity}`);
    },
  },
});

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/auth/callback", async (req, res) => {
  const callback = await shopify.auth.callback({
    rawRequest: req,
    rawResponse: res,
  });

  res.redirect("https://josrade.myshopify.com");
});

app.listen(PORT);
