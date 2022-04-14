import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { InquireContext } from "../../providers/InquireProvider";
import { TagContext } from "../../providers/TagProvider";


const InquireForm = () => {

  const currentUser = getAuth().currentUser;

  const { tags, getAllTags } = useContext(TagContext);

  const { saveInquire } = useContext(InquireContext);

  const [inquire, setInquire] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const newInquire = {...inquire};
    if (e.target.id !== "tags") {
      newInquire[e.target.id] = e.target.value;
    }
    if (e.target.id === "tags") {
      // In case you don't know, you are able to make a select's options into an array to do things like filter and map
      // I filter out the elements that are selected then I map over the selected elements to get their value
      // for the inquire form. In this case an array of tag ids.
      newInquire[e.target.id] = Array.from(e.target.options).filter(el => el.selected).map(el => tags.find(t => t.id === +el.value));
    }
    setInquire(newInquire);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveInquire(inquire).then((i) => navigate(`/inquire/details/${i.id}`));
  };

  useEffect(() => {
    getAllTags().then(() => {
      fetch(`/api/user/${currentUser.uid}`)
        .then(r => r.json())
        .then((user) => setInquire({...inquire, userId: user.id}));
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title</Label>
        <Input onChange={handleChange} id="title" placeholder="Enter question here" />
      </FormGroup>
      <FormGroup>
        <Label>Content</Label>
        <Input onChange={handleChange} id="content" type="textarea" placeholder="Talk about your question in more detail" />
      </FormGroup>
      <FormGroup>
      <Label for="exampleSelectMulti">
        Select Tags
      </Label>
      <Input
        id="tags"
        multiple
        name="selectMulti"
        type="select"
        onChange={handleChange}
      >
        {
          tags.map(t => {
            return (
              <option key={t.id} value={t.id} >
                {t.name}
              </option>
            );
          })
        }
      </Input>
      <Button type="submit" >Submit</Button>
      </FormGroup>
    </Form>
  );

};

export default InquireForm;