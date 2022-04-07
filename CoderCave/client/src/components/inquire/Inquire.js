import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";


const Inquire = ({ inquire }) => {
  return (
    <Card className="mt-2">
      <CardBody>
        <CardTitle tag="h5"><Link to={`/inquire/${inquire.id}`}>{inquire.title}</Link></CardTitle>
        <CardText>{inquire.contentSummary}</CardText>
      </CardBody>
      <CardBody>
        <CardText>
          Posted By: <Link to={`/user/${inquire.userId}`}>{inquire.user.displayName}</Link>&nbsp;on {new Date(inquire.createdAt).toLocaleString()}
        </CardText>
        <CardText>
          Answers: {inquire.answersCount} &nbsp;
          Comments: {inquire.commentsCount} &nbsp;
          Votes: {inquire.votesCount}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default Inquire;