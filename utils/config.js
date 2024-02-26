const { NODE_ENV } = process.env;

const { JWT_SECRET = "default" } = process.env;

module.exports = { JWT_SECRET, NODE_ENV };
