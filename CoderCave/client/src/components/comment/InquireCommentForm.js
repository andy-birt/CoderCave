import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { InquireContext } from "../../providers/InquireProvider";

const InquireCommentForm = ({ isLoggedIn }) => {

  const currentUser = getAuth().currentUser;

  const { inquire, getInquire } = useContext(InquireContext);

  const { saveInquireComment, editInquireComment } = useContext(CommentContext);

  const [ comment, setComment ] = useState({ inquireId: inquire.id });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.id) {
      saveInquireComment(comment)
        .then(() => navigate(`/inquire/details/${comment.inquireId}`));
    } else {
      editInquireComment(comment)
        .then(() => navigate(`/inquire/details/${comment.inquireId}`));
    }
  };

  const handleChange = (e) => {
    const newComment = { ...comment };
    newComment[e.target.id] = e.target.value;    
    setComment(newComment);
  };

  useEffect(() => {
    if (!comment.inquireId) {
      getInquire(id);
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