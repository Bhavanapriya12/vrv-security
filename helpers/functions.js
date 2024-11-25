const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports = {
  //This function is used to generate random string to generate unique user id in our project
  get_random_string: (str, length, pre_append = false) => {
    if (str === "0")
      return crypto
        .randomBytes(Number(length / 2))
        .toString("hex")
        .toUpperCase();
    else if (pre_append) {
      return (
        str +
        crypto
          .randomBytes(Number(length / 2))
          .toString("hex")
          .toUpperCase()
      );
    }
    return (
      crypto
        .randomBytes(Number(length / 2))
        .toString("hex")
        .toUpperCase() + str
    );
  },

  //function to hash password using hashsync function by generating salt and using it with help of bcrypt module
  hash_password: (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(password, salt);
    return hashed_password;
  },

  //function to compare password of hashed password and normal password at the time of login to restrict access of incorrect passowrds..

  compare_password: (password, hashed_password) => {
    b = bcrypt.compareSync(password, hashed_password);
    if (b) return true;
    else return false;
  },
};
