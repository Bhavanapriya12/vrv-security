const express = require("express");
const user = require("../routes/user");
const queue = require("express-queue");

//This is the route configuration to access routes

module.exports = (app) => {
  // Middleware setup
  app.use(express.json());

  // Route handlers
  app.get("/", async (req, res) => {
    return res.status(200).send("Hello, Welcome to Vrv-Security Home 🚀");
  });

  // API routes
  app.use(
    "/user",
    user,
    queue({
      activeLimit: 1,
      queuedLimit: -1,
    })
  );
};
