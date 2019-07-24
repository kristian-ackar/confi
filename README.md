# Confi

Confi is simple system where you can apply for attending to some conference. System is used as a tutorial for learning Koa.js and Angular.

Backend system is build mainly using Koa.js, PostgreSql adapter and TypeORM (typescript is used).

Frontend system is based on Angular 8.

## Installation

1. Clone repository from https://github.com/kristian-ackar/confi.git
2. In server/src/environment.ts set data for connecting to the PostgreSql server and Sendgrid mail API (db.synchronize set initially to TRUE to create db schema on application load)
3. cd server && npm install
4. npm start (ts-node and nodemon are used to transpile and serve server app)
5. npm i @angular/cli -g (if you don't have installed Angular CLI)
6. cd client && npm install
7. ng serve

Now both server and client apps are loaded!