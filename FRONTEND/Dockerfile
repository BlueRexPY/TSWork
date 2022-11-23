FROM node:14.6.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN  npm run build


CMD ["npm", "run", "start"]
