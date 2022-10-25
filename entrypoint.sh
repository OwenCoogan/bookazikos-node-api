npx sequelize db:create --env production
npx sequelize db:migrate
npx sequelize db:seed:all
node server.js
