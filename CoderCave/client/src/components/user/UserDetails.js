import { useState, useEffect, useContext } from "react";
import { Card, CardBody, Row, Col, Container } from "reactstrap";
import {  Link, useParams } from "react-router-dom";
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
      <h3 className="mt-3 mb-3">Recent Activity</h3>
      <Row>
        <Col>
          <h4 className="mt-3 mb-3">Questions</h4>
          {user.inquiries?.map(i => 
            <div key={i.id}>
              <h5><Link to={`/inquire/details/${i.id}`}>{i.title}</Link></h5>
              <p>{i.content}</p>
            </div>
          )}
        </Col>
        <Col>
          <h4 className="mt-3 mb-3">Answers</h4>
          {user.answers?.map(a => 
            <div key={a.id}>
              <p>{a.content}</p>
              <p>{ a.isSelected && <i className="selected-answer bi bi-check-lg"></i> } -- Answered on <strong><Link to={`/inquire/details/${a.inquireId}`}>{a.inquire.title}</Link></strong></p>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="mt-3 mb-3">Comments on Questions</h4>
          {user.inquireComments?.map(ic => 
            <div key={ic.id}>
              <p>{ic.content}</p>
              <p>-- Commented on <strong><Link to={`/inquire/details/${ic.inquireId}`}>{ic.inquire.title}</Link></strong></p>
            </div>
          )}
        </Col>
        <Col>
          <h4 className="mt-3 mb-3">Comments on Answers</h4>
          {user.answerComments?.map(ac => 
            <div key={ac.id}>
              <p>{ac.content}</p>
              <p>-- Commented on <strong><Link to={`/inquire/details/${ac.answer.inquireId}`}>{ac.answer.inquire.title}</Link></strong></p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;