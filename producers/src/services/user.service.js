const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');


const getUsers = async () => {
  return User.get();
}

module.exports = {
  getUsers,
};
