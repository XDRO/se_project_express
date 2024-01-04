// const path = require("path");
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("./models/user");

// const { PORT = 3000, BASE_PATH } = process.env;
// const app = express();

// mongoose.connect("mongodb://localhost:27017/authdb", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post("/signup", (req, res) => {
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) =>
//       User.create({
//         email: req.body.email,
//         password: hash,
//       }),
//     )
//     .then((user) => {
//       res.status(201).send({
//         _id: user._id,
//         email: user.email,
//       });
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// app.post("/signin", (req, res) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       // write your code here
//       const token = jwt.sign({ _id: user._id }, "super-strong-secret", {
//         expiresIn: "7d",
//       });
//       res.send({ token });
//     })
//     .catch((err) => {
//       res.status(401).send({ message: err.message });
//     });
// });

// app.use(express.static(path.join(__dirname, "public")));
// app.listen(PORT, () => {
//   console.log("Link to the server:");
//   console.log(BASE_PATH);
// });

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

const { register, login } = require("./controllers/auth");

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/authdb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/signup", register);
app.post("/signin", login);

app.use("/posts", auth, require("./routes/posts")); // a new route was added

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("Link to the server:");
  console.log(BASE_PATH);
});
