
FROM node:14-alpine3.16 AS builder

WORKDIR /app
COPY package.json yarn.lock ./
COPY public/ public/
COPY src/ src/
RUN npm install
RUN npm run build

FROM nginx:1.23.2-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]