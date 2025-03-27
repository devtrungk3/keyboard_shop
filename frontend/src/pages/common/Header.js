import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

function Header({ searchTerm, onSearch }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || 'Guest');
        setRole(decoded.role || 'user'); // Mặc định là 'user' nếu không có role
      } catch (error) {
        console.error('Invalid token:', error);
        setUsername('Guest');
        setRole('user');
      }
    } else {
      setUsername('Guest');
      setRole('user');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Keyboard Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {/* Thanh tìm kiếm */}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Enter name, description, or brand"
                className="me-2"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                style={{ width: '300px' }}
              />
            </Form>

            {/* Hiển thị link Admin nếu role là 'admin' */}
            {role === 'admin' ? (
              <Nav.Link href="/admin" className="text-warning fw-bold">
                Admin
              </Nav.Link>
            ) : (
              <span className="text-light fw-bold">{username}</span>
            )}

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