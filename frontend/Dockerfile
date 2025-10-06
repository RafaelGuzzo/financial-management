FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@19.2.8 && npm ci
COPY . .
RUN ng build --configuration production

FROM nginxinc/nginx-unprivileged:alpine3.22 AS runner
USER nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=build /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]