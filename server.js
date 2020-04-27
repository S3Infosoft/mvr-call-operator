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
const multipartMiddleware = require("connect-multiparty")();
const nodemailer = require("nodemailer");

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

// File path
const filePath = "./static" + "/document/Document.pdf";
form = new formidable.IncomingForm();

app.post("/receive", function (req, res, next) {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on("fileBegin", function (name, file) {
    file.path = __dirname + "/uploads/" + file.name;
  });

  form.on("file", function (name, file) {
    console.log("Uploaded " + file.name);

    // Step 1
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Step 2
    let mailOptions = {
      from: "kappkumar@gmail.com",
      to: "appkumark@yahoo.com",
      subject: "Call Log Report",
      text: "You'r requested report",
      attachments: [{ filename: "Report.pdf", path: "./uploads/Report.pdf" }],
    };

    // Step 3
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      } else {
        console.log("Email sent!!!");
      }
    });
  });

  res.send("Done");
});

// File Upload using routes
// app.post('/receive', multipartMiddleware, (request, response) => {
//   fs.readFile(request.files.pdf_file.path, (err, data) => {
//       fs.writeFile(filePath, data, function (err) {
//           if (err) throw err;
//           console.log(filePath)
//           response.send('Done')
//       });
//   })
// })

// Define the PORT
const port = process.env.PORT || 5000;

// Map PORT with server
app.listen(port, () =>
  console.log(`Express server is up and available at port ${port}`)
);
