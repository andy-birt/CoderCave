import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";

const CommentList = ({ comments, isLoggedIn, getInquire }) => {

  let loggedInUserFBID = null;
   
  if (isLoggedIn) loggedInUserFBID = getAuth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({});

  const { deleteInquireComment } = useContext(CommentContext);

  const navigate = useNavigate();

  const handleDeleteComment = (id, inquireId) => {
    if (window.confirm('Are you sure you want to delete this answer?')) {
      deleteInquireComment(id)
        .then(() => getInquire(inquireId));
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
              (isLoggedIn && c.userId === currentUser.id ) &&
              <>
                <Button onClick={() => navigate(`/inquire/comment/edit/${c.id}`)} className="mb-3" style={{marginRight: ".25rem"}}>Edit Comment</Button>
                <Button onClick={() => handleDeleteComment(c.id, c.inquireId)} className="mb-3">Delete Comment</Button>
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