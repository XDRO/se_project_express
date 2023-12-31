// this is a rough hypothesis of what I'll need to do inside of my patch request
// my goal is to seprate this into a controller and a route
application.patch("/users/me/:id", (req, res) => {
  let userId = req.params.userId; // change req object to whatever is needed, * 1
  let userUpdate = user.find((el) => el.userId === userId); // instead of userId he just uses id
  let index = user.indexOf(userUpdate);

  Object.assign(userUpdate, req.body);

  users[index] = userUpdate;

  FileSystem.writeFile("/user/me.json", JSON.stringify(movies), (err) => {
    // unsure whether or not this is the correct path
    res.status(200).json({
      status: "success",
      data: {
        user: userUpdate,
      },
    });
  }); // FileSystem is called fs in youtube video
}); //possibly add this id property

// Here below is the exact code written in the video
app.patch("/api/v1/movies/:id", (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);
  // error handling
  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "No movie object with ID" + id + "is found",
    });
  }
  let index = movies.indexOf(movieToUpdate);
  // you can use a spread operator, look into what that is, instead of Object.assign
  Object.assign(movieToUpdate, req.body);

  movies[index] = moviesToUpdate;
  // Just to remember 201 request is creating something successfully
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({ status: "success", data: { movie: movieToUpdate } });
  });
});

// previous code for update user controller
const updateUser = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;
  const { name } = req.body;

  user
    .findByIdAndUpdate(userId, { $set: { avatar } }, { new: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: "Error from update user", e });
    });
};

// working on currently
app.use("/users/me", auth, require("./routes/index"), (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const user = users.find((el) => el.id == userId);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "No user object with ID" + userId + "is found ",
    });
  }
  const userIndex = users.indexof(user);

  Object.assign(user, req.params);

  users[userIndex] = user;

  FileSystem.writeFile("/users/me.json", JSON.stringify(users), (err) => {
    res.status(200).json({ status: "success", data: { user: user } });
  });
  next();
});

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

// const getCurrentUser = (req, res) => {
//   // Assuming you have a user model with _id property / user.js model
//   // Replace this with your actual logic to get the logged-in user
//   const userId = req.user._id; // Assuming user data is attached to the request object

//   // Replace this with your actual logic to fetch user data from the database
//   // const user = await User.findById(userId);

//   const user = {
//     _id: userId,
//     username: "exampleUser",
//     // Other user properties
//   };

//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   res.json(user);
// };

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
//   });w

// Code for error controller createUserErrors, doesn't work, may come in handy one day, I doubt it as of right now though

// try {
//   const { name, avatar, email } = req.body;
//   if (name.length == 2 || name.length > 30) {
//     const validationError = new Error({ message: error.message });
//     validationError.statusCode = HTTP_BAD_REQUEST;
//     throw validationError;
//   }
//   const existingUser = await user.findOne({ email });
//   if (existingUser) {
//     const duplicateEmailError = new Error({ message: error.message });
//     duplicateEmailError.statusCode = HTTP_CONFLICT;
//     throw duplicateEmailError;
//   }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email || !emailRegex.test(email)) {
//     const validationError = new Error({ message: error.message });
//     validationError.statusCode = HTTP_BAD_REQUEST;
//     throw validationError;
//   }
//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };

//   if (!avatar || isValidUrl(avatar)) {
//     return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
//   }
// } catch {
//   console.log(error);
// }
