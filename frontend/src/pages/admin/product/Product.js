import React, {useState, useEffect} from 'react';
import {getProducts} from '../../../services/api';
import ProductList from './ProductList';
import {ViewProductModal, AddProductModal, EditProductModal} from './ProductModals';


const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({
        viewProduct: null,
        showAddModal: false,
        editProduct: null,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            setProducts(response?.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleViewProduct = (product) => {
        setModalState({
            viewProduct: product,
            showAddModal: false,
            editProduct: null,
        });
    };

    const handleEditProduct = (product) => {
        setModalState({
            viewProduct: null,
            showAddModal: false,
            editProduct: product,
        });
    };

    const handleOpenAddModal = () => {
        setModalState({
            viewProduct: null,
            showAddModal: true,
            editProduct: null,
        });
    };

    const closeModal = () => {
        setModalState({
            viewProduct: null,
            showAddModal: false,
            editProduct: null,
        });
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
                    <button className="btn btn-outline-danger" onClick={fetchProducts}>
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
                    <button className="btn btn-success btn-sm shadow-sm" onClick={handleOpenAddModal}>
                        <i className="bi bi-plus-circle me-2"></i>Thêm sản phẩm
                    </button>
                </div>

                <div className="card-body p-4">
                    {products.length === 0 ? (
                        <p className="text-muted text-center py-4">Không có sản phẩm nào.</p>
                    ) : (
                        <ProductList
                            products={products}
                            onView={handleViewProduct}
                            onEdit={handleEditProduct}
                            onDelete={() => { /* logic delete */
                            }}
                        />
                    )}
                </div>
            </div>

            {/*Modal here*/}
            <ViewProductModal product={modalState.viewProduct} onClose={closeModal}/>
            <AddProductModal show={modalState.showAddModal} onClose={closeModal} onSubmit={() => { /* Thêm logic thêm sản phẩm */
            }}/>
            <EditProductModal product={modalState.editProduct} onClose={closeModal} onSubmit={() => { /* Thêm logic sửa sản phẩm */
            }}/>
        </div>
    );
};

export default Product;