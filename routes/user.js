const express = require("express");
const mongoFunctions = require("../helpers/mongoFunctions");
const router = express.Router();
const validations = require("../helpers/schema");
const functions = require("../helpers/functions");
const rateLimit = require("../helpers/custom_rateLimter");
const { Auth } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

//This route is for all users including admins to login..This route give jwt token as response

router.post("/login", rateLimit(60, 40), async (req, res) => {
  data = req.body;//in this route i have used rate limiter to limit the no of requests...It helps to give security from automation..brute force attacks that prevent unauthorised access
  console.log(data);
  //validate data
  var { error } = validations.emp_login(data);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await mongoFunctions.find_one("USERS", {
    email: data.email.toLowerCase(),
  });
  if (!user) return res.status(400).send("No User Found With The Given Email");//checking user if they are existing or not
  const validPassword = functions.compare_password(
    data.password,
    user.password
  );
  console.log(validPassword);
  console.log(user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");//checking password if it is correct or not
  if (user.status.toLowerCase() === "disable")
    return res.status(400).send("User Status Disabled! Please Contact Admin.");//checking for disabled accounts

  const token = jwt.sign(
    {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      status: user.status,
      user_role: user.user_role,
    },
    process.env.jwtPrivateKey,
    { expiresIn: "7d" }//setting expiry time for access token after this time completed it will throw token expiration error
  );
  console.log(token);

  return res.status(200).send({
    success: "Logged In Successfully",
    token: token,
  });
});

//This route is for all users including admin to get their profile

router.post("/get_profile", Auth, async (req, res) => {
  console.log("get profile route hit");
  const user = req.user;
  let user_profile = await mongoFunctions.find_one(
    "USERS",
    {
      user_id: user.user_id,
    },
    {
      _id: 0,
      __v: 0,
      updatedAt: 0,
      createdAt: 0,
      password: 0,
    }
  );

  if (!user_profile) return res.status(400).send("User Not Found..!");//checking user existance
  return res.status(200).send({ profile: user_profile });//if user,it will give their profile
});

//This route is for only admins to register user after login through add user page and this checks the admin authorisation by using auth middleware and checks the role from token
router.post("/register_user", Auth, async (req, res) => {
  let data = req.body;
  var { error } = validations.register_user(data);
  if (error) return res.status(400).send(error.details[0].message);
  const user_role = ["1"];
  if (!user_role.includes(req.user.user_role)) {
    return res.status(403).send("Only Admin  Can Add New User");//it is a role based authorisation..only admin role(means role type "1") can register user
  }

  let find_user = await mongoFunctions.find_one("USERS", {
    $or: [
      {
        email: data.email.toLowerCase(),
      },
    ],
  });//this is for unique email check...to avoid duplicate ids and if any checks are needed in future ..we can include in this or condition..this helps in code optimisation by reducing no of queries to a single query with or condition

  if (
    find_user &&
    find_user.user_id.toUpperCase() === data.user_id.toUpperCase()
  ) {
    return res.status(400).send("User Already Exists");//if user already exists with that email it will throw error
  }
  if (
    find_user &&
    find_user.email &&
    find_user.email.toLowerCase() === data.email.toLowerCase().trim()
  ) {
    return res.status(400).send("Email Id Already Exists");
  }

  const new_password = data.password;
  let password_hash = functions.hash_password(new_password);
  let new_user_data = {
    user_id: await functions.get_random_string("USER", 5, true),
    password: password_hash,

    first_name: data.first_name,
    last_name: data.last_name,
    gender: data.gender,
    email: data.email.toLowerCase(),
    user_role: data.user_role,
    status: data.status,
  };
  let new_user = await mongoFunctions.create_new_record("USERS", new_user_data);//storing user details to db
  if (!new_user) {
    return res.status(400).send("Failed To Add New User.");
  }

  return res.status(200).send({
    success: "User Added Successfully..!!",
  });
});

//This route is used to get all users by only admin..This route is authorised for only admin to check all users data created by them..
router.post("/get_all_users", Auth, async (req, res) => {
  console.log("get users list route hit");
  const user = req.user;
  const LIMIT = 50;
  const data = req.body;
  const { error } = validations.get_all_users(data);

  if (error) return res.status(400).send(error.details[0].message);

  if (user.user_role !== "1") {
    return res.status(403).send("Forbidden: Not Administrator");//this is for only admins to track all users data ..i have implemented role based access here
  }
  //  Logic for admin to get all users
  let users = await mongoFunctions.lazy_loading(
    "USERS",
    {},
    { user_role: 0, password: 0 },
    { _id: -1 },
    LIMIT,
    data.skip
  );//iam giving data using skip and limit..it helps when there is pagination in frontend
  return res.status(200).send(users);
});

//dummy route to register admin user...We can create admin just by hitting this route and admin will created and stored in database..After admin creation is done,then admin can add all users by logging into the project...

router.post("/register_admin", async (req, res) => {
  let data = req.body;
  var { error } = validations.register_admin(data);
  if (error) return res.status(400).send(error.details[0].message);
  let find_user = await mongoFunctions.find_one("USERS", {
    $or: [
      {
        email: data.email.toLowerCase(),
      },
    ],
  });

  if (
    find_user &&
    find_user.email &&
    find_user.email.toLowerCase() === data.email.toLowerCase().trim()
  ) {
    return res.status(400).send("Email Id Already Exists");//checking if admin with this email is already exists so that they can just go for a login instead of registering..
  }

  const new_password = "Admin@1234";
  let password_hash = functions.hash_password(new_password);
  console.log(password_hash);
  let new_user_data = {
    user_id: functions.get_random_string("USER", 5, true),
    password: password_hash,

    first_name: data.first_name,
    last_name: data.last_name,
    gender: data.gender,
    email: data.email.toLowerCase(),
    user_role: "1",
    status: "active",
  };
  let admin = await mongoFunctions.create_new_record("USERS", new_user_data);
  if (!admin) {
    return res.status(400).send("Failed To Add Admin.");
  }

  return res.status(200).send({
    success: "Admin Added Successfully..!!",
  });
});//this route is useful for creating admins through postman by entering necessary details...

module.exports = router;
