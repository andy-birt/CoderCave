import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const Tag = ({ tag }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle><Link to={`/tag/questions/${tag.id}`}>{tag.name}</Link></CardTitle>
        <CardText>{tag.description}</CardText>
      </CardBody>
    </Card>
  );
};

export default Tag;