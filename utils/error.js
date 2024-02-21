class HTTP_BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class HTTP_FORBIDDEN extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class HTTP_NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class HTTP_INTERNAL_SERVER_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

class HTTP_UNAUTHORIZED extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class HTTP_CONFLICT extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class MONGO_DB_DUPLICATE_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 11000;
  }
}

module.exports = {
  HTTP_OK_REQUEST: 200,
  HTTP_BAD_REQUEST,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_UNAUTHORIZED,
  HTTP_CONFLICT,
  MONGO_DB_DUPLICATE_ERROR,
};
