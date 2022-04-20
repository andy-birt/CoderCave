import { Collapse, Nav, Navbar, NavbarBrand,  NavbarToggler, NavItem, NavLink, Form, Input, Button } from "reactstrap";
import NavLogo from "./logos/NavLogo";
import { logout } from "../managers/authManager";
import { useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { SearchContext } from "../providers/SearchProvider";


const Header = ({ isLoggedIn, isAdmin }) => {

  const { setSearchTerm } = useContext(SearchContext);

  const [ query, setQuery ] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    navigate('/search/page/1');
  };

  const handleQuestionButtonClick = (e) => {
    if (isLoggedIn) {
      navigate("/inquire/new");
    } else {
      alert("You must be logged in to ask a question");
    }
  };

  return ( 
    <Navbar
      color="light"
      expand="md"
      fixed=""
      light
    >
      <NavbarBrand href="/">
        <NavLogo />
      </NavbarBrand>
      { location.pathname !== '/' && 
        <Form onSubmit={handleSearch} className="header-search">
          <div className="search-container">
            <span className="search-icon-main"><i className="bi bi-search"></i></span>
            <Input type="search" onChange={e => setQuery(e.target.value)} placeholder="Start your search here..." />
          </div>
        </Form>
      }
      <NavbarToggler onClick={function noRefCheck(){}} />
      <Collapse navbar style={{justifyContent: 'end'}}>
        <Nav
          navbar
        >
          
          { !isLoggedIn &&
            <>
              <NavItem>
                <NavLink href="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">
                  Register
                </NavLink>
              </NavItem>
            </>
          }

          { (isLoggedIn && isAdmin) &&
            <>
              <NavItem>
                <NavLink href="/tag">
                  Tags
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/user/active">
                  Users
                </NavLink>
              </NavItem>
            </>
          }

          { isLoggedIn &&
            <>
              <Button onClick={handleQuestionButtonClick} >Ask a Question</Button>
              <NavItem>
                <NavLink onClick={handleLogout} href="#">
                  Logout
                </NavLink>
              </NavItem>
            </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;