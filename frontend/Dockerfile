# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Másoljuk a package.json és package-lock.json fájlokat
COPY package*.json ./

# Telepítjük a függőségeket
RUN npm install

# Másoljuk a teljes projektet
COPY . .

# Buildeljük az Angular alkalmazást
RUN npm run build

# Production stage
FROM nginx:alpine

# Másoljuk a buildet az nginx szerverbe
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Nginx konfigurációt másolunk, ha szükséges
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
