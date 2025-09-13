# Lightweight Node.js image for serving static content
FROM node:20-alpine AS web_bioinformatica

# Create app directory
WORKDIR /app

# Install only what we need to run the site
COPY package*.json ./
RUN npm ci

# Copy the rest of the project (exclude via .dockerignore)
COPY . .

# Cloud Run provides PORT; default to 8080 locally
EXPOSE 8080

# Avoid dev tooling at runtime
ENV NODE_ENV=production

# Use the locally installed http-server and honor Cloud Run's PORT env var
CMD ["sh", "-c", "npm start"]

