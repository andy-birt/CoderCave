import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { InquireContext } from "../../providers/InquireProvider";
import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button, Container } from "reactstrap";
import AnswerList from "../answer/AnswerList";
import TagList from "../tag/TagList";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

const InquireDetails = ({ isLoggedIn }) => {

  let loggedInUserFBID = null;
   
  if (isLoggedIn) loggedInUserFBID = getAuth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({});

  const { inquire, getInquire, editInquire } = useContext(InquireContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const archiveInquire = () => {
    if (window.confirm("Do you wish to archive this question?")) {
      return editInquire({ ...inquire, isArchived: true })
        .then(() => navigate('/'));
    }
  };

  const handleAnswerButtonClick = (e) => {
    if (isLoggedIn) {
      navigate(`/inquire/answer/${inquire.id}`);
    } else {
      alert("You must be logged in to answer a question");
    }
  };

  const handleCommentButtonClick = (e) => {
    if (isLoggedIn) {
      navigate(`/inquire/comment/${inquire.id}`);
    } else {
      alert("You must be logged in to comment on a question");
    }
  };

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

  if ( !inquire.isArchived || currentUser.id === inquire.userId || currentUser.userType?.type === "Admin" ) {

    return (
      <>
        <Button color="dark" className="mt-3" outline onClick={() => navigate(-1)} >Back</Button>
        <h2 className="inquire-title">{inquire.title}</h2>
        <Button onClick={handleAnswerButtonClick}  className="mb-3">Add Answer</Button>
        {' '}
        {
          (isLoggedIn && (inquire.userId === currentUser.id || currentUser.userType?.type === "Admin")) &&
          <>
            <Button onClick={() => navigate(`/inquire/edit/${id}`)} className="mb-3">Edit Question</Button>
            {' '}
            <Button onClick={() => archiveInquire()} className="mb-3">Archive Question</Button>
          </>
        }
        <div className="row">
          <div className="col-1">
            <Score voteType={'inquire'}  score={inquire.score} id={inquire.id} />
          </div>
          <div className="col-11">
            <ReactMarkdown
              children={inquire.content}
              rehypePlugins={[rehypeSanitize]}
            />
            <div className="d-flex justify-content-end align-items-center inquire-author-info">
              <div  className="details-tag-list mt-2">
                <TagList tags={inquire.tags} />
              </div>
              <Link to={`/user/details/${inquire.userId}`}>
                <img src={inquire.authorImageURL} alt="" style={{width: 75}} />
                - {inquire.authorName} 
              </Link>
              {new Date(inquire.createdAt).toLocaleString()}  
            </div>
            <Container className="comments-container" >
              <CommentList comments={inquire.comments} isLoggedIn={isLoggedIn} getInquire={getInquire} />
              <Button onClick={handleCommentButtonClick} >Add Comment</Button>
            </Container>
          </div>
        </div>
        <AnswerList inquireUserId={inquire.userId} answers={inquire.answers} isLoggedIn={isLoggedIn} getInquire={getInquire} />
      </>
    );

  } else {

    return (
      <>Question not Found</>
    );

  }
};

export default InquireDetails;