const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const { PORT = 3001 } = process.env;

const app = express();

const { errors } = require("celebrate");

const { globalErrorHandler } = require("./middlewares/error");

const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch();

const routes = require("./routes");

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use(routes, require("./routes/index"));

app.use(errorLogger);

app.use(errors());

app.use(globalErrorHandler);

app.listen(PORT, () => {});

// "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data"
