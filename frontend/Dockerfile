FROM node:20-alpine as build
WORKDIR /app
COPY angular-app/package*.json ./
RUN npm install
COPY angular-app/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/angular-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]