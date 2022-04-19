import React, { useContext, useEffect } from "react";
import { Button, Container, Form, Input } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import Tag from "../tag/Tag";
import H1Logo from "../logos/H1Logo";
import { SearchContext } from "../../providers/SearchProvider";
import { useNavigate } from "react-router";

const Main = ({ isLoggedIn }) => {

  const { tags, getAllTags } = useContext(TagContext);

  const { setSearchTerm } = useContext(SearchContext);

  

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search/page/1');
  };

  const handleQuestionButtonClick = (e) => {
    if (isLoggedIn) {
      navigate("/inquire/new");
    } else {
      alert("You must be logged in to ask a question");
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <Container>
      <Button onClick={handleQuestionButtonClick} >Ask a Question</Button>
      <H1Logo />
      <Form onSubmit={handleSearch} >
        <div className="search-container">
          <span className="search-icon-main"><i className="bi bi-search"></i></span>
          <Input type="search" onChange={e => setSearchTerm(e.target.value)} className="main-search" placeholder="Start your search here..." />
        </div>
      </Form>
      <div className="or-separator text-center">
        <div className="or-separator-line"></div>
        OR
        <div className="or-separator-line"></div>
      </div>
      <div className="tag-list">
        {
          tags.map(t => <Tag key={t.id} tag={t} />)
        }
      </div>
    </Container>
  );
};

export default Main;