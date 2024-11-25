const Joi = require("joi");

//These are the schemas to validate data that is coming from a web page...Joi module validates the data properly and effectively that is coming from a web page..Validations are very important while storing data to a database because as a backend developers we never trust the data coming from a web page ,we need to validate the data securely and accept proper data only to provide security

//Schema for register user

function register_user(data) {
  const schema = Joi.object({
    email: Joi.string().required().max(55),
    password: Joi.string().required().min(8).max(15),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().required(),
    status: Joi.string().required().valid("active", "disable"), //disable users cannot login..this will help when admin wants to deactive a user instead of permanently deletion
    user_role: Joi.string().required().valid("1", "2", "3"), //here iam taking 1 for admin,2 for user,3 for moderator for better role checking
  });
  return schema.validate(data);
}

//Schema for register admin
function register_admin(data) {
  const schema = Joi.object({
    email: Joi.string().required().max(55),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().required(),
  });
  return schema.validate(data);
}

// Schema for login user
function emp_login(data) {
  const schema = Joi.object({
    email: Joi.string().required().max(55),
    password: Joi.string().required().min(8).max(15),
  });
  return schema.validate(data);
}

//Schema to get all users
function get_all_users(data) {
  const schema = Joi.object({
    skip: Joi.number().required().min(0),
  });
  return schema.validate(data);
}

// Export the functions
module.exports = {
  emp_login,
  register_user,
  get_all_users,
  register_admin,
};
