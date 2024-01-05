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

// const path = require("path");
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const auth = require("./middleware/auth");

// const { register, login } = require("./controllers/auth");

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

// app.post("/signup", register);
// app.post("/signin", login);

// app.use("/posts", auth, require("./routes/posts")); // a new route was added

// app.use(express.static(path.join(__dirname, "public")));
// app.listen(PORT, () => {
//   console.log("Link to the server:");
//   console.log(BASE_PATH);
// });

//example for creating the get current user by id controller
// Import your user model if you have one
// const User = require('../models/User');

const getCurrentUser = (req, res) => {
  // Assuming you have a user model with _id property / user.js model
  // Replace this with your actual logic to get the logged-in user
  const userId = req.user._id; // Assuming user data is attached to the request object

  // Replace this with your actual logic to fetch user data from the database
  // const user = await User.findById(userId);

  const user = {
    _id: userId,
    username: "exampleUser",
    // Other user properties
  };

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

// module.exports = {
//   getCurrentUser,
// };

// removed from get current user {}
// const { userId } = req.params;

// user
//   .findById(userId)
//   .orFail()
//   .then((item) => res.status(200).send({ data: item }))
//   .catch((e) => {
//     if (e instanceof mongoose.CastError) {
//       const castError = new Error(e.message);
//       castError.statusCode = HTTP_BAD_REQUEST;
//       next(castError);
//     } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
//       const notFoundError = new Error(e.message);
//       notFoundError.statusCode = HTTP_NOT_FOUND;
//       next(notFoundError);
//     } else {
//       next(e);
//     }
//   });
