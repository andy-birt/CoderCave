import { useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";

const TagListAdmin = () => {

  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <Container>
      {tags.map(t => <Tag key={t.id} tag={t} />)}
    </Container>
  );

};

export default TagListAdmin;