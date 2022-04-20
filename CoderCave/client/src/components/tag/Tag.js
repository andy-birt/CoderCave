import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const Tag = ({ tag }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle><Link to={`/tag/details/${tag.id}`}>{tag.name}</Link></CardTitle>
        <CardText>{tag.description}... </CardText>
        <CardText><Link to={`/tag/details/${tag.id}`}>Read More</Link></CardText>
        <CardText>{tag.inquireCount} Questions</CardText>
      </CardBody>
    </Card>
  );
};

export default Tag;