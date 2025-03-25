import React, {useState, useEffect} from 'react';
// import {getProducts, addProduct, updateProduct, deleteProduct} from '../../../services/api';
import {getProducts} from '../../../services/api';
import ProductList from './ProductList';
import {ViewProductModal, AddProductModal, EditProductModal} from './ProductModals';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            if (response && response.data) {
                setProducts(response.data);
            } else {
                throw new Error('Không nhận được dữ liệu sản phẩm');
            }
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || 'Không thể tải danh sách sản phẩm'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleView = (product) => {
        setSelectedProduct(product);
        setShowAddModal(false);
        setEditProduct(null);
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setSelectedProduct(null);
        setShowAddModal(false);
    };

    const handleDelete = async (productId) => {
        // if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        //     try {
        //         await deleteProduct(productId);
        //         setProducts(products.filter((product) => product.productId !== productId));
        //     } catch (err) {
        //         setError('Không thể xóa sản phẩm: ' + (err.response?.data?.message || err.message));
        //     }
        // }
    };

    const handleAddProduct = async (productData) => {
        // try {
        //     const response = await addProduct(productData);
        //     setProducts([...products, response.data]);
        //     setShowAddModal(false);
        // } catch (err) {
        //     setError('Không thể thêm sản phẩm: ' + (err.response?.data?.message || err.message));
        // }
    };

    const handleUpdateProduct = async (productId, productData) => {
        // try {
        //     const response = await updateProduct(productId, productData);
        //     setProducts(
        //         products.map((product) =>
        //             product.productId === productId ? response.data : product
        //         )
        //     );
        //     setEditProduct(null);
        // } catch (err) {
        //     setError('Không thể sửa sản phẩm: ' + (err.response?.data?.message || err.message));
        // }
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setShowAddModal(false);
        setEditProduct(null);
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-grow text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <p className="mt-3 text-muted">Đang tải danh sách sản phẩm...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
                    <span>{error}</span>
                    <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Products</h3>
                    <button
                        className="btn btn-success btn-sm shadow-sm"
                        onClick={() => {
                            setShowAddModal(true);
                            setSelectedProduct(null);
                            setEditProduct(null);
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Thêm sản phẩm
                    </button>
                </div>
                <div className="card-body p-4">
                    {products.length === 0 ? (
                        <p className="text-muted text-center py-4">Không có sản phẩm nào.</p>
                    ) : (
                        <ProductList
                            products={products}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

            <ViewProductModal product={selectedProduct} onClose={closeModal}/>
            <AddProductModal
                onClose={closeModal}
                onSubmit={handleAddProduct}
                show={showAddModal}
            />
            <EditProductModal
                product={editProduct}
                onClose={closeModal}
                onSubmit={handleUpdateProduct}
            />
        </div>
    );
};

export default Product;