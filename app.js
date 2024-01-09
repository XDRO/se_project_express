const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const {
  globalErrorHandler,
  createUserErrors,
} = require("./controllers/errorController");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch();

const routes = require("./routes");

app.use(express.json());

// removed hard coded object

app.use(routes, require("./routes/index"));

app.use(createUserErrors, globalErrorHandler);

app.listen(PORT, () => {});

// run in gitbash to start database "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data"
