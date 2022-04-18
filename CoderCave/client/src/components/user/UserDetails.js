import { useState, useEffect, useContext } from "react";
import { Card, CardBody, Row, Col, Container, Button } from "reactstrap";
import {  useParams } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

const UserDetails = () => {

  const { getUserById } = useContext(UserContext);

  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getUserById(id)
      .then(setUser);
  } ,[id]);
  

  return (
    <Container>
      <h2>{user.displayName}</h2>
      <Card className="user-item">
        <CardBody>
          <Row>
            <Col lg="2">
              <img src={user.imageURL} alt="" width={150} />
            </Col>
            <Col>
              <p>{user.firstName} {user.lastName}</p>
              <p>Role: {user.userType?.type}</p>
              <p>Inquiries: {user.inquireCount}</p>
              <p>Answers: {user.acceptedAnswerCount}/{user.answerCount} Selected</p>
              <p>Comments: {user.commentCount}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{user.bio}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default UserDetails;