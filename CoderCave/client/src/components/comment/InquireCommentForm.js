import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { InquireContext } from "../../providers/InquireProvider";

const InquireCommentForm = ({ isLoggedIn }) => {

  const currentUser = getAuth().currentUser;

  const { inquire, getInquire } = useContext(InquireContext);

  const [ comment, setComment ] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = () => {};

  const handleChange = (e) => {
    const newComment = { ...comment };
    newComment[e.target.id] = e.target.value;    
    setComment(newComment);
  };

  useEffect(() => {
    if (!inquire.id) {
      getInquire(inquire.id);
    }

    if (isLoggedIn) {
      fetch(`/api/user/${currentUser.uid}`)
        .then(r => r.json())
        .then((user) => setComment({...comment, userId: user.id}));
    } else {
      navigate(-1);
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button color="dark" className="mt-3 mb-3" outline onClick={() => navigate(-1)} >Back</Button>
        <h3>{inquire.title}</h3>
        <FormText>{inquire.content}</FormText>
        <p></p>
        <FormGroup>
          <Label>Content</Label>
          <Input onChange={handleChange} defaultValue={comment.content} id="content" type="textarea" placeholder="What do you think about this question?" />
        </FormGroup>
        <Button type="submit" >Submit</Button>
      </Form>
    </Container>
  );
};

export default InquireCommentForm;