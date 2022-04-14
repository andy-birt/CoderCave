import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { InquireContext } from "../../providers/InquireProvider";
import { TagContext } from "../../providers/TagProvider";


const InquireForm = () => {

  const currentUser = getAuth().currentUser;

  const { tags, getAllTags } = useContext(TagContext);

  const { saveInquire, editInquire } = useContext(InquireContext);

  const [inquire, setInquire] = useState({});

  const [inquireTags, setInquireTags] = useState([]);

  const { id } = useParams();

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
      const newInquireTags = Array.from(e.target.options).filter(el => el.selected).map(el => +el.value);
      setInquireTags(newInquireTags);
    }
    setInquire(newInquire);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inquire.id) {
      // Were going to use the inquire state but in order to include the tags we selected were using the inquireTags state and filtering the tags to create tag objects
      saveInquire({...inquire, tags: tags.filter(t => inquireTags.find(it => it === t.id))}).then((i) => navigate(`/inquire/details/${i.id}`));
    } else {
      editInquire({...inquire, tags: tags.filter(t => inquireTags.find(it => it === t.id))}).then(() => navigate(`/inquire/details/${inquire.id}`));
    }
  };

  useEffect(() => {
    getAllTags().then(() => {
      if (id) {
        // Normally I would elect to just use getting the inquire by it's id as it is in the provider
        // in this case I'm setting the tags separately since I was having issues setting the default value
        // in the multi select
        return fetch(`/api/inquire/${id}`)
          .then(r => r.json())
          .then((i) => {
            setInquire(i);
            setInquireTags(i.tags.map(t =>  t.id));
          });
      } else {
        // Here I need to go an extra step to get the current user's id since locally were storing firebaseId
        // I use that to fetch the user from db and then set the inquire userId
        return fetch(`/api/user/${currentUser.uid}`)
          .then(r => r.json())
          .then((user) => setInquire({...inquire, userId: user.id}));
      }
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="hidden" defaultValue={inquire.id} />
      <FormGroup>
        <Label>Title</Label>
        <Input onChange={handleChange} defaultValue={inquire.title} id="title" placeholder="Enter question here" />
      </FormGroup>
      <FormGroup>
        <Label>Content</Label>
        <Input onChange={handleChange} defaultValue={inquire.content} id="content" type="textarea" placeholder="Talk about your question in more detail" />
      </FormGroup>
      <FormGroup>
        <Label>
          Select Tags
        </Label>
        <Input
          id="tags"
          multiple
          type="select"
          onChange={handleChange}
          value={inquireTags.filter(id => id)}
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
      </FormGroup>
      <Button type="submit" >Submit</Button>
    </Form>
  );

};

export default InquireForm;