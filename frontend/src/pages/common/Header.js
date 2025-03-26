import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || 'Guest'); // Giả sử token có chứa `username`
      } catch (error) {
        console.error('Invalid token:', error);
        setUsername('Guest');
      }
    } else {
      setUsername('Guest');
    }
    console.log(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">KeyShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/profile">{username}</Nav.Link>
            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
