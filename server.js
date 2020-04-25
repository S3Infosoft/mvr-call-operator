const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const cron = require("node-cron");
const http = require("http");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

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

const uploadDir = path.join(__dirname, "/..", "/..", "/..", "/uploads/");

// File Upload using routes
app.post("/upload", function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // `file` is the name of the <input> field of type `file`
    var old_path = files.file.path,
      file_size = files.file.size,
      file_ext = files.file.name.split(".").pop(),
      index = old_path.lastIndexOf("/") + 1,
      file_name = old_path.substr(index),
      new_path = path.join(
        process.env.PWD,
        "/uploads/",
        file_name + "." + file_ext
      );

    fs.readFile(old_path, function (err, data) {
      fs.writeFile(new_path, data, function (err) {
        fs.unlink(old_path, function (err) {
          if (err) {
            res.status(500);
            res.json({ success: false });
          } else {
            res.status(200);
            res.json({ success: true });
          }
        });
      });
    });
  });
});

// Define the PORT
const port = process.env.PORT || 5000;

// Map PORT with server
app.listen(port, () =>
  console.log(`Express server is up and available at port ${port}`)
);
