module.exports = {
  HTTP_OK_REQUEST: 200,
  HTTP_BAD_REQUEST: 400,
  HTTP_NOT_FOUND: 404,
  HTTP_INTERNAL_SERVER_ERROR: 500,
  HTTP_UNAUTHORIZED: 401,
  HTTP_CONFLICT: 409,
  MONGO_DB_DUPLICATE_ERROR: 11000,
};

// Error handling
// If something goes wrong in any of the requests, the server returns a response with
// an error and one of the following corresponding statuses:
// 400 — invalid data was passed to the methods for creating an item/user or
// updating an item/user.
// 400 — an invalid ID passed to the params:
// Project 13. Checklist 5
// GET <http://localhost:3001/users/invalidid> // CastError
// GET <http://localhost:3001/users/61cb4d051586a1fe37> //CastError
// 401 — there is something wrong with authorization; i.e., an incorrect email or
// password, the token is invalid, or an unauthorized user is trying to access
// protected routes.
// 403 — the user is trying to remove the card of another user.
// 404 — there is no user or clothing item with the requested id or the request was
// sent to a non-existent address.
// 409 — when registering, the user entered an email address that already exists
// on the server.
// 500 — default error. Accompanied by the message: “An error has occurred on
// the server.”
