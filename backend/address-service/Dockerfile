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

# Build folyamat
RUN npm run build

# Ellenőrizzük a dist könyvtár tartalmát és szerkezetét
RUN find /app -name "main.js" | grep -v "node_modules" || echo "main.js not found"

EXPOSE 3000

# Használjuk a lefordított JavaScript fájlt
# A shell script ellenőrzi, hogy hol található a main.js fájl
CMD ["sh", "-c", "MAIN_JS=$(find /app -name 'main.js' | grep -v 'node_modules' | head -1); if [ -n \"$MAIN_JS\" ]; then node $MAIN_JS; else echo 'Main file not found' && exit 1; fi"]
