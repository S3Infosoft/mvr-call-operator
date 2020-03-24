require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const req = require("./routes/oktaApiCall");

// External Okta API call
// console.log(req);

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to Database");
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRouter = require("./routes/users");
app.use("/users", userRouter);

// Server port Listening on
app.listen(5000, () => {
  console.log("Server has started");
});
