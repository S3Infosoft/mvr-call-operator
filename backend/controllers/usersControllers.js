const mongoose = require("mongoose");
const Request = require("request");
const User = require("../models/Users");


// @desc Get all users
// @route GET /api/users
// @access Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc add users
// @route POST /api/users
// @access Public
exports.addUsers = async (req, res, next) => {
  try {
    const { Id, Name, RegisteredOn, Role, Status } = req.body;

    const user = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);

      res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }
};



const url = "https://dev-441752-admin.okta.com/api/v1/users?limit=200";

Request(
  url,
  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "SSWS 00qthC_Tls-hpzrR2uHvPtIVKyCgD1AAP6Vasd7RxQ"
    }
  },
  (error, response, body) => {
    if (!error & (response.statusCode == 200)) {
      var data = JSON.parse(body);
      
      // res.send(data);

      function parseDate(input) {
        let d = new Date(input);
        return d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
      }

      const conn = mongoose.connect(
        process.env.MONGO_URI,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        },
        (err, db) => {
          if (err) throw err;
          const myObj = [];

          for( let i=0; i<data.length; i++){
            let rec = {
              UserID: data[i].id,
              Name: (data[i].profile.firstName +' ' + data[i].profile.lastName),
              RegisteredOn: parseDate(data[i].created).toString(),
              Status: data[i].status
            }
            myObj.push(rec)
          }
          console.log(myObj);
          
          db.collection("Users").insertMany(myObj, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
          });
        }
      );
    }
  }
);
