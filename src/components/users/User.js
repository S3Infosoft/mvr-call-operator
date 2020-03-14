import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

export const User = ({ user }) => {
  const getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        <Link to="#">{user.id}</Link>
      </th>
      <td>
        <Link to="#">
          {user.profile.firstName} {user.profile.lastName}
        </Link>
      </td>
      <td>{user.created}</td>

      <td>
        <Link to="#">
          <Badge color={getBadge(user.status)}>{user.status}</Badge>
        </Link>
      </td>
    </tr>
  );
};
