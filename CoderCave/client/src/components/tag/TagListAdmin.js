import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Container } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";

const TagListAdmin = () => {

  const { tags, getAllTags } = useContext(TagContext);

  const navigate = useNavigate();

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <Container>
      <Button onClick={() => navigate('/tag/new')}>Create New Tag</Button>
      {tags.map(t => <Tag key={t.id} tag={t} />)}
    </Container>
  );

};

export default TagListAdmin;