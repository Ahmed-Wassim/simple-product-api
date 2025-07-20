# AI Products API

A Node.js API to manage products with PDF manuals, semantic search using embeddings & OpenAI GPT.

---

## ⚠️ OpenAI Integration Notice

Please note that this project has not been fully tested beyond the point of OpenAI API integration.

Due to the cost associated with OpenAI API usage, embedding and querying operations using OpenAI's models (e.g., text embeddings) have not been executed in a production environment. All related functionality is implemented but remains unverified with actual API calls.

You may need to configure your own OpenAI API key and monitor usage if you wish to test or deploy these features.

---

## 🔧 Tech Stack

- **Node.js 22** + Express
- **MongoDB** (via Docker)
- **ChromaDB** (via Docker) – vector store
- **OpenAI** – embeddings & generative simplification
- **pdf.js-extract** – PDF text extraction
- **multer** – file uploads
- **dotenv**

---

## 🚀 Setup

1. Clone the repo and enter it:

```bash
git clone <repo-url>
cd ai-products-api
```

2. Create `.env` file:

```
OPENAI_API_KEY=sk-...
MONGO_URI=mongodb://mongo:27017/ai_products
```

3. Ensure Docker is installed and ready.

---

## 🐳 docker-compose.yml

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - ./uploads:/app/uploads
    environment:
      - OPENAI_API_KEY
      - MONGO_URI
    depends_on:
      - mongo
      - chroma

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  chroma:
    image: chromadb/chroma
    ports:
      - "8000:8000"

volumes:
  mongo-data:
```

---

## 🛠️ Dockerfile

```dockerfile
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm install -g nodemon
CMD ["nodemon", "index.js"]
```

---

## 💿 Dependencies

```bash
npm install express mongoose multer pdf.js-extract openai chromadb dotenv
```

---

## 📁 Project Structure

```
ai-products-api/
├── config/db.js
├── models/Product.js
├── services/vectorStore.js
├── utils/pdfReader.js
├── routes/products.js
├── uploads/
├── index.js
├── docker-compose.yml
├── Dockerfile
├── .env
└── README.md
```

---

## ✨ API Endpoints

### - `POST /products`

Form-data: `name`, `description`, `manual` (PDF)

### - `GET /products`

List all products

### - `POST /products/:id/ask`

```json
{ "question": "How do I turn on the smart lamp?" }
```

Response:

```json
{
  "answer": "Simplified GPT-generated answer",
  "source": "Relevant manual snippet"
}
```

---

## ⚙️ Workflow

1. Upload PDF → stored via multer
2. Extract PDF text
3. Generate embeddings → store in Chroma
4. On user question → search → simplify with GPT

---

## 🧩 Future Improvements

- PDF chunking
- Redis caching
- Cron + BullMQ
- Error handling
- Unit tests & CI/CD

---

## 🧭 Running the App

1. `docker-compose up -d --build`
2. Test endpoints via Postman
3. Logs: `docker-compose logs -f app`
