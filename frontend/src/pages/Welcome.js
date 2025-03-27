import React, { useState, useEffect } from 'react';
import Header from './common/Header'; 
import Footer from './common/Footer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getProducts } from '../services/api'; 
import '../styles/App.css';

function Welcome() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProducts();
        const productsArray = Array.isArray(productData) 
          ? productData 
          : productData?.products || productData?.data || [];

        setProducts(productsArray);
        setFilteredProducts(productsArray);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data: ' + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const value = searchTerm.toLowerCase();
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(value) ||
      product.description.toLowerCase().includes(value) ||
      (product.brands?.brandName?.toLowerCase() || '').includes(value)
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header searchTerm={searchTerm} onSearch={setSearchTerm} />
      <Container className="my-5">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          filteredProducts.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.productId}>
                  <Card className="h-100">
                    {product.imageUrl && (
                      <Card.Img 
                        variant="top" 
                        src={product.imageUrl} 
                        alt={product.productName}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{product.productName}</Card.Title>
                      <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                      <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                      <Card.Text><strong>Quantity:</strong> {product.quantity}</Card.Text>
                      <Card.Text><strong>Brand:</strong> {product.brands?.brandName || 'Unknown'}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No products found</p>
          )
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default Welcome;
