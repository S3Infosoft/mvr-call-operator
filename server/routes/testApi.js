/**
 * https://stackoverflow.com/questions/21987909/how-to-get-the-difference-between-two-arrays-of-objects-in-javascript
 * https://stackoverflow.com/questions/22656517/update-in-foreach-on-mongodb-shell
 * https://docs.mongodb.com/manual/reference/operator/update/set/
 */

const fetch = require("node-fetch");
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * 
 * setTimeout(function() {
                console.log(result);
            }, 3000);
 */

const dataProcessing = async () => {
  try {
    let oktadata = await oktaApiCall();

    console.log("Data :", oktadata);
  } catch (error) {
    console.log("Error: ", error);
  }
};

dataProcessing();

function oktaApiCall() {
  let oktadata;

  fetch(process.env.OKTA_API, {
    method: "get",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.OKTA_AUTH
    }
  })
    .then(res => res.json())
    .then(
      json =>
        (oktadata = json.map(item => {
          return {
            UserID: item.id,
            Name: item.profile.firstName + " " + item.profile.lastName,
            RegisteredOn: parseDate(item.created).toString(),
            ModifiedOn: parseDate(item.lastUpdated).toString(),
            Status: item.status
          };
        }))
    );

  function parseDate(input) {
    let d = new Date(input);
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  }

  return oktadata;
}

function dbGetData() {
  let result;
  const conn = mongoose.connect(
    "mongodb://localhost:27017/react-coreui-docker",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    (err, db) => {
      if (err) throw err;

      result = [];
      db.collection("Users")
        .find()
        .toArray((err, data) => {
          if (!err) {
            result = data;

            db.close();
          }
        });

      return result;
    }
  );
}

function compareArrayforDup(secArray) {
  return function(curr) {
    return (
      secArray.filter(function(othr) {
        return othr._id == curr._id;
      }).length == 0
    );
  };
}

function compareObjforChg(secArray) {
  return function(curr) {
    return (
      secArray.filter(function(other) {
        return othr._id == curr._id && othr.ModifiedOn == curr.ModifiedOn;
      }).length == 0
    );
  };
}

function dbDataload(insert) {
  const conn = mongoose.connect(
    "mongodb://localhost:27017/react-coreui-docker",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    (err, db) => {
      if (err) throw err;

      db.collection("Users").insertMany(insert, (err, res) => {
        if (err) throw err;
        console.log("Number of doc's inserted: " + res.insertedCount);
        db.close();
      });
      return result;
    }
  );
}

function dbDataUpdate(insert) {
  const conn = mongoose.connect(
    "mongodb://localhost:27017/react-coreui-docker",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    (err, db) => {
      if (err) throw err;

      db.collection("Users").findByIdAndUpdate(insert._id, {
        $set: insert
      });
      db.close();
    }
  );
}
