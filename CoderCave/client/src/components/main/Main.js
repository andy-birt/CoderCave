import { Container, Input } from "reactstrap";
import H1Logo from "../logos/H1Logo";


const Main = ({ isLoggedIn }) => {
  return (
    <Container>
      <H1Logo />
      <Input className="main-search" placeholder="Start your search here..." />
      <div className="or-separator text-center">
        <div className="or-separator-line"></div>
        OR
        <div className="or-separator-line"></div>
      </div>
    </Container>
  );
};

export default Main;