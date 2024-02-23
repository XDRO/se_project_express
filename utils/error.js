class HttpBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class HttpForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class HttpNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class HttpInternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

class HttpUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class HttpConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  HttpBadRequest,
  HttpForbidden,
  HttpNotFound,
  HttpInternalServerError,
  HttpUnauthorized,
  HttpConflict,
};
