FROM node:16

EXPOSE 6950

WORKDIR /src

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install


COPY . .


CMD [ "node", "server.js" ]
