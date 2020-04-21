const express = require("express");
const router = express.Router();
const fetch = require("cross-fetch");
require("dotenv").config();

// @route GET api/calllogs/logs
// @desc Get all logs
// @access Private
// Still pending to work
router.get("/logs", (req, res) => {
  fetch("https://developers.myoperator.co/search", {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: process.env.OPERATER_TOKEN,
  })
    .then((res) => res.json())
    .then((data) => {
      let dataArry = [];
      let vals = data.data ? data.data.hits : [];
      for (let i = 0; i < vals.length; i++) {
        let dataObj = {};
        dataObj["caller_number"] = vals[i]._source.caller_number;
        dataObj["state"] = vals[i]._source.state;
        dataObj["start_time"] = vals[i]._source.start_time;
        dataObj["end_time"] = vals[i]._source.end_time;
        dataObj["duration"] = vals[i]._source.duration;

        if (vals[i]._source.log_details !== []) {
          dataObj["user_id"] = vals[i]._source.log_details.map(
            (item) => item.received_by[0].user_id
          );
          dataObj["name"] = vals[i]._source.log_details.map(
            (item) => item.received_by[0].name
          );
          dataObj["_ds"] = vals[i]._source.log_details.map((item) => item._ds);
        }
        dataArry.push(dataObj);
      }
      
      res.send(dataArry);
    });
});

// @route GET api/calllogs/logs/duration
// @desc Get all logs
// @access Private
// Still pending to work
router.get("/logs/duration", (req, res) => {
  const start_datetime = "1587335502";
  const end_datetime = "1587421934";
  fetch("https://developers.myoperator.co/search", {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body:
      process.env.OPERATER_TOKEN +
      "&from=" +
      start_datetime +
      "&to=" +
      end_datetime,
  })
    .then((res) => res.json())
    .then((data) => {
      let dataArry = [];
      let vals = data.data ? data.data.hits : [];
      for (let i = 0; i < vals.length; i++) {
        let dataObj = {};
        dataObj["caller_number"] = vals[i]._source.caller_number;
        dataObj["state"] = vals[i]._source.state;
        dataObj["start_time"] = vals[i]._source.start_time;
        dataObj["end_time"] = vals[i]._source.end_time;
        dataObj["duration"] = vals[i]._source.duration;

        if (vals[i]._source.log_details !== []) {
          dataObj["user_id"] = vals[i]._source.log_details.map(
            (item) => item.received_by[0].user_id
          );
          dataObj["name"] = vals[i]._source.log_details.map(
            (item) => item.received_by[0].name
          );
          dataObj["_ds"] = vals[i]._source.log_details.map((item) => item._ds);
        }
        dataArry.push(dataObj);
      }
      
      res.send(dataArry);
    });
});

module.exports = router;
