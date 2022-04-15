import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { AnswerContext } from "../../providers/AnswerProvider";
import { CommentContext } from "../../providers/CommentProvider";

const AnswerCommentForm = ({ isLoggedIn }) => {

  const currentUser = getAuth().currentUser;

  const { getAnswerById } = useContext(AnswerContext);

  const { saveAnswerComment, editAnswerComment, getAnswerCommentById } = useContext(CommentContext);

  const [ comment, setComment ] = useState({});

  const [ answer, setAnswer ] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.id) {
      saveAnswerComment(comment)
        .then(() => navigate(`/inquire/details/${answer.inquireId}`));
    } else {
      editAnswerComment(comment)
        .then(() => navigate(`/inquire/details/${answer.inquireId}`));
    }
  };

  const handleChange = (e) => {
    const newComment = { ...comment };
    newComment[e.target.id] = e.target.value;    
    setComment(newComment);
  };

  useEffect(() => {
        
    if (isLoggedIn) {
      fetch(`/api/user/${currentUser.uid}`)
        .then(r => r.json())
        .then((user) => setComment({...comment, userId: user.id}));
    } else {
      navigate(-1);
    }

    if (!comment.answerId) {
      getAnswerById(id)
        .then((a) => {
          setComment({ ...comment, answerId: a.id });
          setAnswer(a);
        });
    } 

    if (answer.id && (+id !== answer.id)) {
      console.log(`${typeof id} ${typeof answer.id}`)
      getAnswerCommentById(id)
        .then(setComment);
    } 
  }, [id]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button color="dark" className="mt-3 mb-3" outline onClick={() => navigate(-1)} >Back</Button>
        <h3>Answer</h3>
        <FormText>{answer.content}</FormText>
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

export default AnswerCommentForm;