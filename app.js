const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();
const globalErrorHandler = require("./controllers/errorController");
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));

const routes = require("./routes");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "657c5502ad237567deca8def",
  };
  next();
});

app.use(routes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

// run in gitbash to start database "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data"

// removed this Id from postman user_id const variable 61eade4c6d5acf558c42d9b8
