import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { InquireContext } from "../../providers/InquireProvider";
import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button } from "reactstrap";
import AnswerList from "../answer/AnswerList";
import TagList from "../tag/TagList";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const InquireDetails = ({ isLoggedIn }) => {

  let loggedInUserFBID = null;
   
  if (isLoggedIn) loggedInUserFBID = getAuth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({});

  const { inquire, getInquire } = useContext(InquireContext);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getInquire(id);
  }, [id]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/api/user/${loggedInUserFBID}`)
        .then(r => r.json())
        .then(setCurrentUser);
    }
  }, [currentUser.id]);

  return (
    <>
      <h2 className="inquire-title">{inquire.title}</h2>
      <Button className="mb-3">Add Answer</Button>
      {' '}
      {
        (isLoggedIn && (inquire.userId === currentUser.id || currentUser.userType?.type === "Admin")) &&
        <>
          <Button onClick={() => navigate(`/inquire/edit/${id}`)} className="mb-3">Edit Question</Button>
          {' '}
          <Button className="mb-3">Archive Question</Button>
        </>
      }
      <div className="row">
        <div className="col-1">
          <Score score={inquire.score} />
        </div>
        <div className="col-11">
          <div>{inquire.content}</div>
          <div className="d-flex justify-content-end align-items-center inquire-author-info">
            <div  className="details-tag-list mt-2">
              <TagList tags={inquire.tags} />
            </div>
            <Link to={`/user/${inquire.userId}`}>
              <img src={inquire.authorImageURL} alt="" style={{width: 75}} />
              - {inquire.authorName} 
            </Link>
            {new Date(inquire.createdAt).toLocaleString()}  
          </div>
          <CommentList comments={inquire.comments} />
          <Button>Add Comment</Button>
        </div>
      </div>
      <AnswerList answers={inquire.answers} />
    </>
  );
};

export default InquireDetails;