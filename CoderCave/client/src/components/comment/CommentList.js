import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { InquireContext } from "../../providers/InquireProvider";

const CommentList = ({ comments, isLoggedIn, getInquire }) => {

  let loggedInUserFBID = null;
   
  if (isLoggedIn) loggedInUserFBID = getAuth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({});

  const { deleteInquireComment, deleteAnswerComment } = useContext(CommentContext);

  const { inquire } = useContext(InquireContext);

  const navigate = useNavigate();

  const handleDeleteComment = (id, comment) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      if (comment.inquireId) {
        deleteInquireComment(id)
          .then(() => getInquire(comment.inquireId));
      } else {
        deleteAnswerComment(id)
          .then(() => getInquire(inquire.id));
      }
    }
  };
 
  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/api/user/${loggedInUserFBID}`)
        .then(r => r.json())
        .then(setCurrentUser);
    }
  }, [currentUser.id]);

  

  return comments?.map(c => {
    return (
      <Card key={c.id}>
        <CardBody>
          <div className="mr-2"><small>{c.content} </small> </div>
          <div className="d-flex justify-content-end align-items-center comment-author-info">
            {
              (isLoggedIn && c.inquireId && (c.userId === currentUser.id )) &&
              <>
                <Button onClick={() => navigate(`/inquire/comment/edit/${c.id}`)} className="mb-3" style={{marginRight: ".25rem"}}>Edit Comment</Button>
                <Button onClick={() => handleDeleteComment(c.id, c)} className="mb-3">Delete Comment</Button>
              </>
            }
            {
              (isLoggedIn && c.answerId && (c.userId === currentUser.id )) &&
              <>
                <Button onClick={() => navigate(`/inquire/answer/comment/edit/${c.id}`)} className="mb-3" style={{marginRight: ".25rem"}}>Edit Comment</Button>
                <Button onClick={() => handleDeleteComment(c.id, c)} className="mb-3">Delete Comment</Button>
              </>
            }
            <Link to={`/user/${c.userId}`}><img src={c.authorImageURL} alt="" className="comment-avatar" />
              - {c.authorName}
            </Link> 
            {new Date(c.createdAt).toLocaleString()}
          </div>
        </CardBody>
      </Card>
    );
  });
    
};

export default CommentList;