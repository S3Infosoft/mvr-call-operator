import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { fetchLogs } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from 'moment';

// import usersData from "./UsersData";

function LogRow(props) {
  const log = props.log;
  const index = props.index;
  // const userLink = `/users/${user.id}`

  return (
    <tr key={log.user_id}>

      <th scope="row">{index + 1}</th>
      <th>{log.user_id}</th>
      <td>{log._source.caller_number}</td>
      <td>{moment(log._source.start_time).format('HH:mm')}</td>
      <td>{moment(log._source.end_time).format('HH:mm')}</td>
      <td>{log._source.duration}</td>
    </tr>
  );
}

class Logs extends Component {
  componentWillMount() {
    this.props.fetchLogs();
  }

  render() {
    let data = this.props.auth.data;

    function getHits() {
      let pureValues = data ? Object.entries(data)[2][1] : [];
      return pureValues;
    }
    let Output = getHits();

    

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
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
                      <th scope="col">Caller Number</th>
                      <th scope="col">Start time</th>
                      <th scope="col">End time</th>
                      <th scope="col">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Output.map((log, index) => (
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.logs
});

export default connect(mapStateToProps, { fetchLogs })(Logs);
