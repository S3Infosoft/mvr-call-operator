const mongoose = require("mongoose");
const Request = require("request");
const axios = require('axios');
require("dotenv").config();


module.exports = Request(
    process.env.OKTA_API,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.OKTA_AUTH
      }
    },
       async (err, res, body) => {
      if (!err & (res.statusCode == 200)) {
        let data = await JSON.parse(body);
        let intermediateData =  await data.map(item => {
          return {
            UserID: item.id,
            Name: item.profile.firstName + " " + item.profile.lastName,
            RegisteredOn: parseDate(item.created).toString(),
            Status: item.status
          };
        });
        
        function parseDate(input) {
          let d = new Date(input);
          return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        }

        let result;
        const conn =  await mongoose.connect(
          process.env.DATABASE_URL,
          {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          },
             (err, db) => {
            if (err) throw err;

            result = [];
             db.collection("Users").find().toArray((err, data) => {
              if(!err) {
                result =  data
                // console.log(result)
                db.close()
              }
            })
            // db.collection("Users").insertMany(intermediateData, (err, res) => {
            //     if(err) throw err;
            //     console.log("Number of doc's inserted: " + res.insertedCount);
            //     db.close();
            // })
          }
        );

        console.log(result)
        
      }
    }
  );








  