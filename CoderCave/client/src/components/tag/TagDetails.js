import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "reactstrap";
import { InquireContext } from "../../providers/InquireProvider";
import { TagContext } from "../../providers/TagProvider";
import InquireList from "../inquire/InquireList";


const TagDetails = ({ isLoggedIn }) => {

  const { tag, getTag } = useContext(TagContext);

  const { getAllByTagId } = useContext(InquireContext);

  const { id } = useParams();

  useEffect(() => {
    getTag(id)
      .then(() => getAllByTagId(id));
  }, [id]);

  return (
    <Container>
      <h3>{tag.name}</h3>
      <p>{tag.description}</p>
      <InquireList />
    </Container>
  );
};

export default TagDetails;