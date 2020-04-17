import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { fetchLogs } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

// import usersData from "./UsersData";

function LogRow(props) {
  const log = props.log;
  const index = props.index;
  // const val = props.val;
  // const userLink = `/users/${user.id}`

  return (
    <tr key={log.user_id}>
      <th scope="row">{index + 1}</th>
      <td>{log.user_id + " "}</td>
      <td>{log.name + " "}</td>
      <td>{log.caller_number}</td>
      <td>{log.state}</td>
      <td>{log.start_time}</td>
      <td>{log.end_time}</td>
      <td>{log.duration}</td>
      <td>{log._ds + " "}</td>
    </tr>
  );
}

class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: [],
    };
  }

  componentDidMount() {
    this.props.fetchLogs();
  }

  getData(data) {
    let dataArry = [];
    let vals = data ? data.hits : [];
    for (let i = 0; i < vals.length; i++) {
      let dataObj = {};
      dataObj["caller_number"] = vals[i]._source.caller_number;
      dataObj["state"] = vals[i]._source.state;
      dataObj["start_time"] = moment(vals[i]._source.start_time).format(
        "MMM D, YYYY, HH:mmA"
      );
      dataObj["end_time"] = moment(vals[i]._source.end_time).format(
        "MMM D, YYYY, HH:mmA"
      );
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

    return dataArry;
  }

  getCurrentWeek() {
    let curr = new Date();
    let first = curr.getDate() - curr.getDay() + 1;
    let last = first + 6;

    let firstday = new Date(curr.setDate(first)).toUTCString();
    let lastday = new Date(curr.setDate(last)).toUTCString();

    let Monday = moment(firstday).format("MMM D, YYYY, HH:mmA");
    let Sunday = moment(lastday).format("MMM D, YYYY, HH:mmA");

    return [Monday, Sunday];
  }

  getLastWeek() {
    let today = new Date();

    let first = today.getDate() - today.getDay() - 6;
    let last = first + 6;

    let firstday = new Date(today.setDate(first)).toUTCString();
    let lastday = new Date(today.setDate(last)).toUTCString();

    let Monday = moment(firstday).format("MMM D, YYYY, HH:mmA");
    let Sunday = moment(lastday).format("MMM D, YYYY, HH:mmA");

    return [Monday, Sunday];
  }

  getCurrentMonth() {
    let date = new Date();

    let first = new Date(date.getFullYear(), date.getMonth(), 1);
    let last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let firstDay = moment(first).format("MMM D, YYYY, HH:mmA");
    let lastDay = moment(last).format("MMM D, YYYY, HH:mmA");

    return [firstDay, lastDay];
  }

  getPrevMonth() {
    let date = new Date();

    let prevStartDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let preEndDate = new Date(date.getFullYear(), date.getMonth() - 1 + 1, 0);

    let firstDay = moment(prevStartDate).format("MMM D, YYYY, HH:mmA");
    let lastDay = moment(preEndDate).format("MMM D, YYYY, HH:mmA");

    return [firstDay, lastDay];
  }

  dataSelection = (event) => {
    let activeSelection = event.target.value;
    if (activeSelection == 1) {
      activeSelection = this.getCurrentWeek();
    } else if (activeSelection == 2) {
      activeSelection = this.getLastWeek();
    } else if (activeSelection == 3) {
      activeSelection = this.getCurrentMonth();
    } else if (activeSelection == 4) {
      activeSelection = this.getPrevMonth();
    } else if (activeSelection == 0) {
      activeSelection = 0;
    }

    this.setState({
      selection: activeSelection,
    });

    return activeSelection;
  };

  render() {
    let data = this.props.auth.data;

    let dataArry = this.getData(data);

    let selected = this.state.selection;
    console.log(selected);
    if (selected.length == 2) {
      dataArry = dataArry.filter(
        (item) =>
          item.start_time >= selected[0] && item.start_time <= selected[1]
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> CallLogs{" "}
                <span>
                  <select
                    name="reportList"
                    id="reportSelection"
                    onChange={this.dataSelection}
                  >
                    <option value="0">Complete Report</option>
                    <option value="1">Current Week</option>
                    <option value="2">Last Week</option>
                    <option value="3">Current Month</option>
                    <option value="4">Last Month</option>
                  </select>
                </span>
                {/* <small className="text-muted">example</small> */}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">User_ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Caller Number</th>
                      <th scope="col">State</th>
                      <th scope="col">Start time</th>
                      <th scope="col">End time</th>
                      <th scope="col">Duration</th>
                      <th scope="col">_ds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataArry.map((log, index) => (
                      <LogRow key={index} log={log} index={index} />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Logs.propTypes = {
  fetchLogs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth.logs,
});

export default connect(mapStateToProps, { fetchLogs })(Logs);
