import { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { UserContext } from "../../providers/UserProvider";

const User = ({ user, status }) => {

  const { deactivateUser, activateUser, getActiveUsers, getInactiveUsers } = useContext(UserContext);

  const handleActiveStatus = () => {
    if (window.confirm('Are you sure you want to change this user\'s status?')) {
      if (status === "Active") {
        deactivateUser(user.id)
          .then(getActiveUsers);
      } else {
        activateUser(user.id)
          .then(getInactiveUsers);
      }
    }
  };

  const handleUserType = () => {};

  return (
    <Card className="user-item">
      <CardBody>
        <Row>
          <Col lg="5">
            <img src={user.imageURL} alt="" width={150} />
          </Col>
          <Col>
            <h5><Link to={`/user/details/${user.id}`}>{user.displayName}</Link></h5>
            <p>{user.firstName} {user.lastName}</p>
            <Button onClick={handleActiveStatus} className="mb-1">Change to {status === "Active" ? "Inactive" : "Active"}</Button>
            <Button onClick={handleUserType}>Change to {user.userType.type === "Admin" ? "Author" : "Admin"}</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default User;