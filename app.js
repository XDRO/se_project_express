const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const globalErrorHandler = require("./controllers/errorController");

const { createUser, login } = require("./controllers/user");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch();

const routes = require("./routes");

app.use(express.json());
// remove hard coded object below
app.use((req, res, next) => {
  req.user = {
    _id: "657dae224a376abea9db5d7c",
  };
  next();
});

app.use(routes);

app.post("signin", login);
app.post("signup", createUser);

app.use(globalErrorHandler);

app.listen(PORT, () => {});

// run in gitbash to start database "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data"
