// class CustomErr extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// module.exports = CustomErr;

// const error = new CustomErr('some error message', 404)

// add if and else statments to handle different errors inside of controllers
// Implement inside of if and else statements these error codes:
// 400 — invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.
// 404 — there is no user or clothing item with the requested id, or the request was sent to a non-existent address.
// 500 — default error. Accompanied by the message: "An error has occurred on the server."

// I feel like I've already done this with my global error handler
// this might just be repeating myself: below

// const errorHandler = (err, req, res, next) => {
//   if (err.name === "ValidationError") {
//     return res.status(400).send({
//       message: "Invalid data passed to the methods for creating a user.",
//     });
//   } else if (err.name === "CastError" && err.kind === "ObjectId") {
//     return res.status(404).send({
//       message: "Duplicate key error. User with the same data already exists.",
//     });
//   } else {
//     console.error(err);
//     return res.status(500).send({
//       message: "Internal Server Error",
//     });
//   }
// };
