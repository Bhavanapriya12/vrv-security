const mongoose = require("mongoose");

//This is a mongo db database connection to access,store and manipulate data

module.exports = () => {
  var connectionString = String(process.env.CRM_DBSTRING);
  console.log(connectionString);

  mongoose
    .connect(connectionString, {
      autoIndex: true,
    })
    .then(() => console.log("Connected to ☘️ MongoDB...!"))
    .catch((err) => console.log(err));
};
