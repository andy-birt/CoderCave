import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { SearchContext } from "../../providers/SearchProvider";


const Inquire = ({ inquire }) => {

  // const location = useLocation();

  // const { searchTerm } = useContext(SearchContext);

  // useEffect(() => {

  //   const onSearchResults = location.pathname.includes('search');

  //   if (onSearchResults) {
  //     console.log(searchTerm)
  //   }
  // }, []);

  return (
    <Card className="mt-2">
      <CardBody>
        <CardTitle tag="h5"><Link to={`/inquire/details/${inquire.id}`}>{inquire.title}</Link> { inquire.answerSelected && <i className="selected-answer bi bi-check-lg"></i> }</CardTitle>
        <CardText>{inquire.contentSummary}</CardText>
      </CardBody>
      <CardBody>
        <CardText>
          Posted By: <Link to={`/user/details/${inquire.userId}`}>{inquire.authorName}</Link>&nbsp;on {new Date(inquire.createdAt).toLocaleString()}
        </CardText>
        <CardText>
          Answers: {inquire.answersCount} &nbsp;
          Comments: {inquire.commentsCount} &nbsp;
          Votes: {inquire.votesCount}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default Inquire;