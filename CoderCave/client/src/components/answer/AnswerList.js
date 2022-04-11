import Score from "../misc/Score";
import CommentList from "../comment/CommentList";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const AnswerList = ({ answers }) => {
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