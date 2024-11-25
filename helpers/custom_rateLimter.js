const rateLimit = require("express-rate-limit");
module.exports = (time_in_sec, limit) => {
  return rateLimit({
    windowMs: time_in_sec * 1000, //1 * 60 * 1000,
    max: limit,
    message: "Too many requests from this IP, please try again after some time",
    keyGenerator: function (req) {
      console.log("req.user-----", req.user);

      // Ensure req.employee exists and has employee_id
      //It will take user ip by default but what if many people are using same wifi[ip]..in that case we will take user id to restrict requests based on user instead of ip
      if (req.user && req.user.user_id) {
        console.log(req.user);
        return req.user.user_id;
      }
    },
  });
};
