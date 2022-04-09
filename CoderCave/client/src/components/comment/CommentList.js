import { Card } from "reactstrap";

const CommentList = ({ comments }) => {
 
  return comments?.map(c => {
    return (
      <Card key={c.id}>
        <span><small>{c.content} </small> </span>
        <div className="d-flex justify-content-end align-items-center comment-author-info"><img src={c.authorImageURL} alt="" className="comment-avatar" /> - {c.authorName} {new Date(c.createdAt).toLocaleString()}</div>
      </Card>
    );
  });
    
};

export default CommentList;