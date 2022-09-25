FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN npm install bcrypt

RUN npm install

EXPOSE 6950


ENTRYPOINT [ "./entrypoint.sh" ]
