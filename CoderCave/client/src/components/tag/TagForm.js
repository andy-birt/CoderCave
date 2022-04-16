import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

const TagForm = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const { saveTag, editTag, getTagById } = useContext(TagContext);

  const [tag, setTag] = useState({});

  const handleChange = (e) => {
    const newTag = { ...tag };
    newTag[e.target.id] = e.target.value;
    setTag(newTag);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      saveTag(tag)
        .then(r => r.json())
        .then((t) => navigate(`/tag/details/${t.id}`));
    } else {
      debugger;
      editTag(tag)
        .then(() => navigate(`/tag/details/${id}`));
    }
  };

  useEffect(() => {
    if (id) {
      getTagById(id)
        .then(setTag);
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input id="name" onChange={handleChange} defaultValue={tag.name} />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input id="description" type="textarea" onChange={handleChange} defaultValue={tag.description} />
        </FormGroup>
        <Button type="submit" >Submit</Button>
      </Form>
    </Container>
  );
};

export default TagForm;