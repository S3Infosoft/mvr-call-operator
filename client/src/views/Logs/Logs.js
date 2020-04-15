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
      <td>{moment(log.start_time).format("HH:mm")}</td>
      <td>{moment(log.end_time).format("HH:mm")}</td>
      <td>{log.duration}</td>
      <td>{log._ds + " "}</td>
    </tr>
  );
}

class Logs extends Component {
  componentWillMount() {
    this.props.fetchLogs();
  }

  render() {
    
    let data = this.props.auth.data;
    let vals = data ? data.hits : [];
    let dataArry = [];
    function getData() {
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
    }
    getData();

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users{" "}
                <small className="text-muted">example</small>
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
