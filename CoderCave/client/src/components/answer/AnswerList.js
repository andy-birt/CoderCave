import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button, Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AnswerContext } from "../../providers/AnswerProvider";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

const AnswerList = ({ inquireUserId, answers, isLoggedIn, getInquire }) => {

  let loggedInUserFBID = null;
   
  if (isLoggedIn) loggedInUserFBID = getAuth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({});

  const { deleteAnswer, editAnswer } = useContext(AnswerContext);

  const navigate = useNavigate();

  const handleCommentButtonClick = (id) => {
    if (isLoggedIn) {
      navigate(`/inquire/answer/comment/${id}`);
    } else {
      alert("You must be logged in to comment on a question");
    }
  };

  const handleDeleteAnswer = (id, inquireId) => {
    if (window.confirm('Are you sure you want to delete this answer?')) {
      deleteAnswer(id)
        .then(() => getInquire(inquireId));
    }
  };

  const handleSelectAnswer = (a) => {
    if (window.confirm('Are you sure you want to select this answer?')) {
      editAnswer({ ...a, isSelected: true })
        .then(() => getInquire(a.inquireId));
    }
  }

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
            <Score voteType={'answer'} score={a.score} isSelected={a.isSelected} id={a.id} />
          </div>
          <div className="col-11">
            <ReactMarkdown
              children={a.content}
              rehypePlugins={[rehypeSanitize]}
            />
            <div className="d-flex justify-content-end align-items-center answer-author-info">
            { (currentUser.id === inquireUserId && !a.isSelected) && <Button outline color="success" onClick={() => handleSelectAnswer(a)} className="mb-3" style={{marginRight: ".25rem"}} >Select Answer</Button> }
            <div style={{ flexGrow: 1 }} ></div>
            {
              (isLoggedIn && a.userId === currentUser.id ) &&
              <>
                <Button onClick={() => navigate(`/inquire/answer/edit/${a.id}`)} className="mb-3" style={{marginRight: ".25rem"}}>Edit Answer</Button>
                <Button onClick={() => handleDeleteAnswer(a.id, a.inquireId)} className="mb-3">Delete Answer</Button>
              </>
            }
              <Link to={`/user/details/${a.userId}`}>
                <img src={a.authorImageURL} alt="" style={{width: 75}} />
                - {a.authorName} 
              </Link>
              &nbsp;{new Date(a.createdAt).toLocaleString()}
            </div>
            <Container className="comments-container">
              <CommentList comments={a.comments} isLoggedIn={isLoggedIn} getInquire={getInquire} />
              <Button outline onClick={() => handleCommentButtonClick(a.id)} >Add Comment</Button>
            </Container>
          </div>
        </div>
      </div>
    );
    }
  );
};

export default AnswerList;