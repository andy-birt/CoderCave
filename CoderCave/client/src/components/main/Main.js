import React, { useContext, useEffect } from "react";
import { Container, Input } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import Tag from "../tag/Tag";
import H1Logo from "../logos/H1Logo";

const Main = ({ isLoggedIn }) => {

  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <Container>
      <H1Logo />
      <Input className="main-search" placeholder="Start your search here..." />
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