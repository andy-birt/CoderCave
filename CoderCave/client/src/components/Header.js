import { Collapse, Nav, Navbar, NavbarBrand,  NavbarToggler, NavItem, NavLink } from "reactstrap";
import NavLogo from "./logos/NavLogo";
import { logout } from "../managers/authManager";
import { useNavigate } from "react-router";


const Header = ({ isLoggedIn, isAdmin }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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