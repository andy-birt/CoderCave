import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Container, Button } from "reactstrap";
import { InquireContext } from "../../providers/InquireProvider";
import { TagContext } from "../../providers/TagProvider";
import InquireList from "../inquire/InquireList";


const TagDetails = ({ isLoggedIn }) => {

  const { tag, getTag } = useContext(TagContext);

  const { getAllByTagId } = useContext(InquireContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleQuestionButtonClick = (e) => {
    if (isLoggedIn) {
      navigate("/inquire/new");
    } else {
      alert("You must be logged in to ask a question");
    }
  };

  useEffect(() => {
    getTag(id)
      .then(() => getAllByTagId(id));
  }, [id]);

  return (
    <Container>
      <h3>{tag.name}</h3>
      <p>{tag.description}</p>
      <Button onClick={handleQuestionButtonClick} >Ask a Question</Button>
      <InquireList />
    </Container>
  );
};

export default TagDetails;