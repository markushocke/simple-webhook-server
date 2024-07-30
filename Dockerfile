FROM node:lts

WORKDIR /home/node/gbhome

COPY package.json ./

RUN npm i

COPY . .

ENTRYPOINT [ "node", "./index.js"]

EXPOSE 3001