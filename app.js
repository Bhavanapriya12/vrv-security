require("dotenv").config();
const express = require("express");

app = express();
app.set("trust proxy", 1);

app.use(express.json({ limit: "10mb" }));

require("./helpers/cors")(app);
require("./helpers/mongoDb")();
require("./helpers/routeConfig")(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});


