import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Container, Button } from "reactstrap";
import { InquireContext } from "../../providers/InquireProvider";
import { TagContext } from "../../providers/TagProvider";
import InquireList from "../inquire/InquireList";


const TagDetails = ({ isLoggedIn, isAdmin }) => {

  const { tag, getTag, deleteTag } = useContext(TagContext);

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

  const handleEditClick = () => {
    navigate(`/tag/edit/${id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      deleteTag(id)
        .then(() => navigate('/tag'));
    }
  };

  useEffect(() => {
    getTag(id)
      .then(() => getAllByTagId(id));
  }, [id]);

  return (
    <Container>
      <h3>{tag.name}</h3>
      { isAdmin && 
        <>
          <Button className="mb-3" onClick={handleEditClick}>Edit Tag</Button>
          {' '}
          <Button className="mb-3" onClick={handleDeleteClick}>Delete Tag</Button>
        </>
      }
      <p>{tag.description}</p>
      <Button onClick={handleQuestionButtonClick} >Ask a Question</Button>
      <InquireList />
    </Container>
  );
};

export default TagDetails;