const jwt = require("jsonwebtoken");

//This is the authentication middleware to implement user authentication and used to authorise user

module.exports = {
  Auth(req, res, next) {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(401).send({ message: "Token not provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      req.user = decoded;
      console.log(req.user);
      if (req.user.status === "disable") {
        return res
          .status(401)
          .send({ message: "Token is not valid for disabled account" });
      }
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token Is Expired" });
      }
      return res.status(400).send({ message: "Token is not valid" });
    }
  },
};
