import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const CommentList = ({ comments }) => {
 
  return comments?.map(c => {
    return (
      <Card key={c.id}>
        <CardBody>
          <div className="mr-2"><small>{c.content} </small> </div>
          <div className="d-flex justify-content-end align-items-center comment-author-info"><Link to={`/user/${c.userId}`}><img src={c.authorImageURL} alt="" className="comment-avatar" /> - {c.authorName}</Link> {new Date(c.createdAt).toLocaleString()}</div>
        </CardBody>
      </Card>
    );
  });
    
};

export default CommentList;