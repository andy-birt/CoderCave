import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { AnswerContext } from "../../providers/AnswerProvider";
import { InquireContext } from "../../providers/InquireProvider";

const AnswerForm = ({ isLoggedIn }) => {

  const currentUser = getAuth().currentUser;

  const { inquire, getInquire } = useContext(InquireContext);

  const { getAnswerById, saveAnswer, editAnswer } = useContext(AnswerContext);

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
    if (!answer.id) {
      saveAnswer(answer)
        .then(() => navigate(`/inquire/details/${answer.inquireId}`));
    } else {
      editAnswer(answer)
        .then(() => navigate(`/inquire/details/${answer.inquireId}`));
    }
  };

  useEffect(() => {
    if (!inquire.id) {
      getInquire(inquire.id);
    }

    if (id === answer.id) {
      getAnswerById(id)
      .then(setAnswer);
    } else if (isLoggedIn) {
      fetch(`/api/user/${currentUser.uid}`)
        .then(r => r.json())
        .then((user) => setAnswer({...answer, userId: user.id}));
    } else {
      navigate(-1);
    }
  }, [id]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button color="dark" className="mt-3 mb-3" outline onClick={() => navigate(-1)} >Back</Button>
        <h3>{inquire.title}</h3>
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