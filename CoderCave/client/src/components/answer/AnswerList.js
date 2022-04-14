import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const AnswerList = ({ answers, isLoggedIn }) => {

  let loggedInUserFBID = null;
   
  if (isLoggedIn) loggedInUserFBID = getAuth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const deleteAnswer = () => {

  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/api/user/${loggedInUserFBID}`)
        .then(r => r.json())
        .then(setCurrentUser);
    }
  }, [currentUser.id]);

  return answers?.map(a => {
    return (
      <div key={a.id} className="mt-5">
        <div className="row">
          <div className="col-1">
            <Score score={a.score} isSelected={a.isSelected} />
          </div>
          <div className="col-11">
            <div>{a.content}</div>
            <div className="d-flex justify-content-end align-items-center answer-author-info">
            {
              (isLoggedIn && a.userId === currentUser.id ) &&
              <>
                <Button onClick={() => navigate(`/inquire/answer/edit/${a.id}`)} className="mb-3">Edit Answer</Button>
                {' '}
                <Button onClick={() => deleteAnswer()} className="mb-3">Delete Answer</Button>
              </>
            }
              <Link to={`/user/${a.userId}`}>
                <img src={a.authorImageURL} alt="" style={{width: 75}} />
                - {a.authorName} 
              </Link>
              &nbsp;{new Date(a.createdAt).toLocaleString()}
            </div>
            <CommentList comments={a.comments} />
            <Button>Add Comment</Button>
          </div>
        </div>
      </div>
    );
    }
  );
};

export default AnswerList;