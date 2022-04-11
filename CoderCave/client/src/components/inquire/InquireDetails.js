import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { InquireContext } from "../../providers/InquireProvider";
import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button } from "reactstrap";
import AnswerList from "../answer/AnswerList";
import TagList from "../tag/TagList";
import { Link } from "react-router-dom";

const InquireDetails = () => {

  const { inquire, getInquire } = useContext(InquireContext);

  const { id } = useParams();

  useEffect(() => {
    getInquire(id);
  }, [id]);

  return (
    <>
      <h2 className="inquire-title">{inquire.title}</h2>
      <Button className="mb-3">Add Answer</Button>
      <div className="row">
        <div className="col-1">
          <Score score={inquire.score} />
        </div>
        <div className="col-11">
          <div>{inquire.content}</div>
          <div className="d-flex justify-content-end align-items-center inquire-author-info">
            <TagList tags={inquire.tags} />
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