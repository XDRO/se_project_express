const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));
const routes = require("./routes");
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening on
  console.log(`App listening at port ${PORT}`);
});

// run in gitbash to start database "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data"
