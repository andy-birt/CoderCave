import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Button, Container, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { AnswerContext } from "../../providers/AnswerProvider";
import { CommentContext } from "../../providers/CommentProvider";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

const AnswerCommentForm = ({ isLoggedIn }) => {

  const currentUser = getAuth().currentUser;

  const { getAnswerById } = useContext(AnswerContext);

  const { saveAnswerComment, editAnswerComment, getAnswerCommentById } = useContext(CommentContext);

  const [ comment, setComment ] = useState({});

  const [ answer, setAnswer ] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  const path = useLocation().pathname;

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
        .then((user) => {

          const editRegex = new RegExp('edit');
          const isEditPath = editRegex.test(path);

          if (!isEditPath) {
            getAnswerById(id)
              .then((a) => {
                setComment({ ...comment, userId: user.id, answerId: a.id });
                setAnswer(a);
              });
          } else {
            getAnswerCommentById(id)
              .then((c) => {
                getAnswerById(c.answerId)
                  .then((a) => {
                    setAnswer(a);
                    setComment(c);
                  });
              });
          }
        });
    } else {
      navigate(-1);
    }
  }, [id]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button color="dark" className="mt-3 mb-3" outline onClick={() => navigate(-1)} >Back</Button>
        <h3>Answer</h3>
        <ReactMarkdown
          children={answer.content}
          rehypePlugins={[rehypeSanitize]}
        />
        <p></p>
        <FormGroup>
        <FormText>When making a comment on an answer make sure it is substantial and most of all, be nice!</FormText>
          <Input onChange={handleChange} defaultValue={comment.content} id="content" type="textarea" placeholder="What do you think about this answer?" />
        </FormGroup>
        <Button type="submit" >Submit</Button>
      </Form>
    </Container>
  );
};

export default AnswerCommentForm;