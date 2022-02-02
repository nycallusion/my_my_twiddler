const User = require('../models/Users');
const bcrypt = require('bcryptjs');

module.exports = {
  comparePassword: async (incomingPassword, userPassword) => {
    try {
      let comparedPassword = await bcrypt.compare(
        incomingPassword,
        userPassword
      );
      if (comparedPassword) {
        return comparedPassword;
      } else {
        return 409;
      }
    } catch (error) {
      return error;
    }
  },
  createUser: async (user) => {
    let newUser = await new User({
      userName: user.userName,
      email: user.email,
      password: user.password,
    });
    return newUser;
  },
};