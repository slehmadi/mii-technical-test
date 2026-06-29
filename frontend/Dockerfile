# Stage 1: Building ReactApp
FROM node:24-alpine AS builder

WORKDIR /app

ARG VITE_DD_APP_ID
ARG VITE_DD_CLIENT_TOKEN
ARG VITE_DD_SITE

ENV VITE_DD_APP_ID=${VITE_DD_APP_ID}
ENV VITE_DD_CLIENT_TOKEN=${VITE_DD_CLIENT_TOKEN}
ENV VITE_DD_SITE=${VITE_DD_SITE}

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Deploy with NGINX
FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]