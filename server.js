const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const cron = require("node-cron");
const moment = require("moment");

const users = require("./routes/users");
const logs = require("./routes/logs_routes");
const dailyDataLoad = require("./jobs/dailyDataLoad");
// const agenda_routes = require('./routes/agenda_routes');

const app = express();



//Task scheduler
cron.schedule("20 */01 * * * ", function () {
  dailyDataLoad();
});

// Bodyparser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is connected!"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/calllogs", logs);
// app.use('/api/agenda', agenda_routes);

// Define the PORT
const port = process.env.PORT || 5000;

// Map PORT with server
app.listen(port, () =>
  console.log(`Express server is up and available at port ${port}`)
);
