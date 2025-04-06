FROM node:20-alpine

WORKDIR /app

# Másoljuk a package.json és package-lock.json fájlokat
COPY package*.json ./

# Telepítjük a függőségeket
RUN npm install

# Telepítjük a NestJS CLI-t globálisan
RUN npm install -g @nestjs/cli

# Másoljuk a teljes projektet
COPY . .

RUN npm run build

EXPOSE 3000

# Használjuk a lefordított JavaScript fájlt
CMD ["node", "dist/src/main.js"]
