import React, {useState, useEffect} from 'react';
import {getProducts} from '../../services/api';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                if (response && response.data) {
                    setProducts(response.data);
                } else {
                    throw new Error('No product data received');
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return isNaN(numericPrice)
            ? 'Price not available'
            : (numericPrice * 25000).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Products Management</h3>
                </div>
                <div className="card-body">
                    {products.length === 0 ? (
                        <p className="text-muted">No products available.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.productName}</td>
                                        <td>{product.brands?.brandName || 'N/A'}</td>
                                        <td>{formatPrice(product.price)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.description}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;