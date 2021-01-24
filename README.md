# JStify


Text justify with Node, Express,Passport, JWT, Bcrypt, MySQL and Sequelize


# Run the project :


npm install


Declare all your environment variables in a .env file like in .env.example


node app.js


_npx sequelize-cli db:seed:all to create a user with email : "admin@admin.com" and password "admin" after variables declaration in config/config.json_


**http://localhost:4000**


POST requests


```
/api
  ├── /auth
  |   ├── /signup
  |   └── /signin
  └── /justify
```
