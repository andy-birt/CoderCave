import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { AnswerContext } from "../../providers/AnswerProvider";
import { InquireContext } from "../../providers/InquireProvider";

const AnswerForm = () => {

  const currentUser = getAuth().currentUser;

  const { inquire, getInquire } = useContext(InquireContext);

  const { saveAnswer } = useContext(AnswerContext);

  const [ answer, setAnswer ] = useState({ inquireId: inquire.id });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const newAnswer = { ...answer };

    newAnswer[e.target.id] = e.target.value;

    setAnswer(newAnswer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAnswer(answer)
      .then(() => navigate(`/inquire/details/${answer.inquireId}`));
  };

  useEffect(() => {
    if (!inquire.id) {
      getInquire(id);
    }
    fetch(`/api/user/${currentUser.uid}`)
      .then(r => r.json())
      .then((user) => setAnswer({...answer, userId: user.id}));
  }, [id]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <p>Question</p>
        <FormText>{inquire.content}</FormText>
        <p></p>
        <FormGroup>
          <Label>Content</Label>
          <Input onChange={handleChange} defaultValue={answer.content} id="content" type="textarea" placeholder="What would you do to solve this problem? Talk about that in as much detail as possible." />
        </FormGroup>
        <Button type="submit" >Submit</Button>
      </Form>
    </Container>
  );
};

export default AnswerForm;