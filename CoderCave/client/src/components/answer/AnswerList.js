import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button } from "reactstrap";

const AnswerList = ({ answers }) => {
  return answers?.map(a => {
    return (
      <div className="mt-5">
        <div className="row">
          <div className="col-1 mt-3">
            <Score score={a.score} isSelected={a.isSelected} />
          </div>
          <div className="col-10">{a.content}</div>
          <div className="d-flex justify-content-end align-items-center answer-author-info">
            <img src={a.authorImageURL} alt="" style={{width: 75}} />
            <div>- {a.authorName} {new Date(a.createdAt).toLocaleString()}</div>
          </div>
          <CommentList comments={a.comments} />
        </div>
        <Button>Add Comment</Button>
      </div>
    );
    }
  );
};

export default AnswerList;