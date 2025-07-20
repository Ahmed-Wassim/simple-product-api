// services/vectorStore.js
const OpenAI = require("openai");
const { ChromaClient } = require("chromadb");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chroma = new ChromaClient();

async function initCollection(name = "products_manuals") {
  return chroma.getOrCreateCollection({ name });
}

async function embedText(text) {
  const resp = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return resp.data[0].embedding;
}

module.exports = { openai, chroma, initCollection, embedText };
