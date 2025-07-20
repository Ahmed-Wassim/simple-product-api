const fs = require("fs");
const path = require("path");
const { PDFExtract } = require("pdf.js-extract");

const pdfExtract = new PDFExtract();

async function readPDFText(relativePath) {
  const fullPath = path.resolve(__dirname, "..", relativePath);
  const buffer = fs.readFileSync(fullPath);

  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(buffer, {}, (err, data) => {
      if (err) return reject(err);

      const text = data.pages
        .map((page) => page.content.map((item) => item.str).join(" "))
        .join("\n\n");

      resolve(text);
    });
  });
}

module.exports = readPDFText;
