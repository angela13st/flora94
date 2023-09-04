import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log('userInfo:', userInfo); // Check the entire userInfo object
  console.log('userInfo.isEmployee:', userInfo?.isEmployee); // Check if isEmployee is accessible
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>FLORA 94</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Košarica
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/AboutUs">
                <Nav.Link>
                  O nama
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Assortment">
                <Nav.Link>
                  Što nudimo
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/allProducts">
                <Nav.Link>
                  Proizvodi
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/custombouquet">
                <Nav.Link>
                  Složi buket
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/articles">
                <Nav.Link>
                  Članci
                </Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={`/profile/${userInfo._id}`}>
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  
                  <NavDropdown.Item onClick={logoutHandler}>
                    Odjava
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    {" "}
                    <i className="fas fa-user"></i>Prijava
                  </Nav.Link>
                </LinkContainer>
              )}
              
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>Korisnici</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>Proizvodi</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/schedule">
                    <NavDropdown.Item>Rasporedi</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/allRestocks">
                    <NavDropdown.Item>Zalihe</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/articles">
                    <NavDropdown.Item>Članci</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                
                
              )}
               {userInfo && userInfo.isEmployee && ( // Check if the user is an employee
                    <NavDropdown title="Zaposlenik" id="zaposlenik">
                    <LinkContainer to="/myschedule">
                    <NavDropdown.Item>Raspored</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/restock">
                  <NavDropdown.Item>Zalihe</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/create-article">
                  <NavDropdown.Item>Napiši članak</NavDropdown.Item>
                  </LinkContainer>
                  </NavDropdown>
                  )}
                    
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <row style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'pink'}}>
      <h2> <marquee> BESPLATNA DOSTAVA NA SVE NARUDŽBE IZNAD 50€ </marquee></h2></row>
    </header>
  );
};

export default Header;
