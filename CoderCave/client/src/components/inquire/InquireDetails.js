import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { InquireContext } from "../../providers/InquireProvider";
import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button } from "reactstrap";
import AnswerList from "../answer/AnswerList";

const InquireDetails = () => {

  const { inquire, getInquire } = useContext(InquireContext);

  const { id } = useParams();

  useEffect(() => {
    getInquire(id);
  }, [id]);

  return (
    <>
      <h2 className="inquire-title">{inquire.title}</h2>
      <div className="row">
        <div className="col-1 mt-3">
          <Score score={inquire.score} />
        </div>
        <div className="col-11">{inquire.content}</div>
        <div className="d-flex justify-content-end align-items-center inquire-author-info">
          <img src={inquire.authorImageURL} alt="" style={{width: 75}} />
          <div>- {inquire.authorName} {new Date(inquire.createdAt).toLocaleString()}</div>
        </div>
        <CommentList comments={inquire.comments} />
      </div>
      <Button>Add Comment</Button>
      <AnswerList answers={inquire.answers} />
    </>
  );
};

export default InquireDetails;