const mongoose = require("mongoose");

//This is the model used to validate the data again before storing it to database..The usage of this model is to accept fields that are only defined in this schema..It won't accept the fields that are out of this schema..This helps to securely store only necessary data

const User_schema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    first_name: { type: String, required: true },
    password: { type: String, required: true },
    last_name: { type: String, required: true },
    user_role: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

//I have implemented indexing for faster performance..Because as a backend developers we need to focus on security and performance also instead of only writing the code..

User_schema.index({ user_id: 1, email: 1 });

exports.USERS = mongoose.model("USERS", User_schema);
