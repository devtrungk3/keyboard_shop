import React from 'react';
import Header from './common/Header'; 
import Footer from './common/Footer';
import { Container } from 'react-bootstrap';

function Welcome() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="my-5">
        <h1>Welcome to KeyShop!</h1>
        <p>Browse our mechanical keyboards and accessories.</p>
      </Container>
      <Footer />
    </div>
  );
}

export default Welcome;