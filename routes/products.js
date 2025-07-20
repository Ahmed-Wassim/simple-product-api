const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const upload = require("../middlewares/upload");
const readPDFText = require("../utils/pdfReader");
const {
  initCollection,
  embedText,
  chroma,
} = require("../services/vectorStore");

router.post("/", upload.single("manual"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const manualPath = req.file ? req.file.path.replace(/^\/?/, "") : null;

    const product = new Product({
      name,
      description,
      manualPath,
    });

    await product.save();

    const text = await readPDFText(product.manualPath);
    const embedding = await embedText(text);

    const collection = await initCollection();
    await collection.add({
      ids: [product._id.toString()],
      documents: [text],
      embeddings: [embedding],
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("there is an error in route", err);
    process.exit(1);
  }
});

router.post("/:id/ask", async (req, res) => {
  const { question } = req.body;

  const embeddingQ = await embedText(question);
  const result = await collection.query({
    queryEmbeddings: [embeddingQ],
    nResults: 1,
  });
  const matchedText = result.documents[0][0];
  res.json({ answer: matchedText });
});

module.exports = router;
