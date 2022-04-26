import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, FormText } from "reactstrap";
import { AnswerContext } from "../../providers/AnswerProvider";
import { InquireContext } from "../../providers/InquireProvider";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";


const AnswerForm = ({ isLoggedIn }) => {

  const currentUser = getAuth().currentUser;

  const { inquire, getInquire } = useContext(InquireContext);

  const { getAnswerById, saveAnswer, editAnswer } = useContext(AnswerContext);

  const [ answer, setAnswer ] = useState({ inquireId: inquire.id });

  const { id } = useParams();

  const navigate = useNavigate();

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
    if (isLoggedIn && parseInt(id) !== inquire.id) {
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
        <ReactMarkdown
          children={inquire.content}
          rehypePlugins={[rehypeSanitize]}
        />
        <p></p>
        <FormGroup>
          <FormText>Be very descriptive and thorough with how you answer this question. </FormText>
          <FormText>If you know Markdown you can type it freely in the text editor. </FormText>
          <FormText>You can see your text appear in the preview section to give you an idea how your answer will look. </FormText>
          <FormText>If you need help with Markdown. There's a nice <a target="_blank" rel="noreferrer" href="https://www.markdownguide.org/cheat-sheet/">Cheat Sheet</a> you can use to familiarize yourself with the syntax.</FormText>
          <FormText> Remember, syntax matters!</FormText>
          <p></p>
          <MDEditor
          value={answer.content}
          onChange={(content) => setAnswer({ ...answer, content: content })}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
        </FormGroup>
        <Button type="submit" >Submit</Button>
      </Form>
    </Container>
  );
};

export default AnswerForm;