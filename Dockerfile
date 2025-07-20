FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port
EXPOSE 3000

RUN npm install -g nodemon

# Run the app
CMD ["nodemon", "index.js"]
