# Open Parlamento frontend — build statica + nginx (serve + reverse-proxy /lr,/agent)
# Build su Debian (non alpine): il build esegue il prerender SEO via Playwright,
# che richiede Chromium e le sue dipendenze di sistema.
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Chromium + dipendenze per il prerender (scripts/prerender.mjs)
RUN npx playwright install --with-deps chromium
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
