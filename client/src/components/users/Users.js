import React, { useContext, useEffect } from "react";

import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { GlobalContext } from "../../context/GlobalState";
import { User } from "./User";

export const Users = () => {
  const { users, getUsers } = useContext(GlobalContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={8}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Users{" "}
              <small className="text-muted">example</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">registered</th>
                    <th scope="col">status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <User key={index} user={user} />
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
