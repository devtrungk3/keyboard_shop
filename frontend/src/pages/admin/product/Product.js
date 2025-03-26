import React, {useState, useEffect} from 'react';
import {getProducts, getBrands, addProduct, updateProduct, deleteProduct} from '../../../services/api';
import ProductList from './ProductList';
import {ViewProductModal, AddProductModal, EditProductModal} from './ProductModals';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({
        viewProduct: null,
        showAddModal: false,
        editProduct: null,
    });
    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const productResponse = await getProducts();
                console.log('Dữ liệu sản phẩm từ API:', productResponse);
                setProducts(productResponse?.data || []);

                const brandResponse = await getBrands();
                setBrands(brandResponse?.data || []);
            } catch (err) {
                setError(err.response?.data?.message || 'Không thể tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewProduct = (product) => {
        setModalState({
            viewProduct: product,
            showAddModal: false,
            editProduct: null,
        });
    };

    const handleEditProduct = (product) => {
        console.log('Sản phẩm được chọn để chỉnh sửa:', product); // Thêm log để kiểm tra dữ liệu
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

    const handleAddProduct = async (productData) => {
        try {
            setIsAdding(true);
            if (brands.length === 0) {
                throw new Error('Không có thương hiệu nào để chọn. Vui lòng thử lại sau.');
            }

            const formattedData = {
                ...productData,
                brandId: parseInt(productData.brandId),
                price: parseFloat(productData.price),
                quantity: parseInt(productData.quantity),
            };

            const response = await addProduct(formattedData);
            const newProduct = response.data;

            const selectedBrand = brands.find((brand) => brand.brandId === newProduct.brandId);
            if (!selectedBrand) {
                throw new Error('Không tìm thấy thương hiệu tương ứng với brandId.');
            }

            const productWithBrand = {
                ...newProduct,
                brands: selectedBrand,
            };

            setProducts([...products, productWithBrand]);
            closeModal();
            setToastMessage('Thêm sản phẩm thành công!');
            setShowToast(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Không thể thêm sản phẩm';
            setErrorMessage(message);
            setShowErrorToast(true);
        } finally {
            setIsAdding(false);
        }
    };

    const handleEditProductSubmit = async (productId, productData) => {
        try {
            setIsEditing(true);
            const formattedData = {
                ...productData,
                brandId: parseInt(productData.brandId),
                price: parseFloat(productData.price),
                quantity: parseInt(productData.quantity),
            };

            const response = await updateProduct(productId, formattedData);
            const updatedProduct = response.data;

            const selectedBrand = brands.find((brand) => brand.brandId === updatedProduct.brandId);
            if (!selectedBrand) {
                throw new Error('Không tìm thấy thương hiệu tương ứng với brandId.');
            }

            const productWithBrand = {
                ...updatedProduct,
                brands: selectedBrand,
            };

            setProducts(
                products.map((product) =>
                    product.productId === productId ? productWithBrand : product
                )
            );
            closeModal();
            setToastMessage('Sửa sản phẩm thành công!');
            setShowToast(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Không thể sửa sản phẩm';
            setErrorMessage(message);
            setShowErrorToast(true);
        } finally {
            setIsEditing(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteProduct(productId);
            setProducts(products.filter((product) => product.productId !== productId));
            setToastMessage('Xóa sản phẩm thành công!');
            setShowToast(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Không thể xóa sản phẩm';
            setErrorMessage(message);
            setShowErrorToast(true);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="container mt-5">
            <div
                className={`toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3 ${
                    showToast ? 'show' : ''
                }`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-bs-autohide="true"
                data-bs-delay="3000"
                onClick={() => setShowToast(false)}
            >
                <div className="d-flex">
                    <div className="toast-body">{toastMessage}</div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={() => setShowToast(false)}
                    ></button>
                </div>
            </div>

            <div
                className={`toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3 ${
                    showErrorToast ? 'show' : ''
                }`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-bs-autohide="true"
                data-bs-delay="3000"
                onClick={() => setShowErrorToast(false)}
            >
                <div className="d-flex">
                    <div className="toast-body">{errorMessage}</div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={() => setShowErrorToast(false)}
                    ></button>
                </div>
            </div>

            {loading ? (
                <div className="container mt-5 text-center">
                    <div className="spinner-grow text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                    <p className="mt-3 text-muted">Đang tải dữ liệu...</p>
                </div>
            ) : error ? (
                <div className="container mt-5">
                    <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
                        <span>{error}</span>
                        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                            Thử lại
                        </button>
                    </div>
                </div>
            ) : (
                <div className="card shadow-lg border-0">
                    <div
                        className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
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
                                onDelete={handleDeleteProduct}
                            />
                        )}
                    </div>
                </div>
            )}

            <ViewProductModal product={modalState.viewProduct} onClose={closeModal}/>
            <AddProductModal
                show={modalState.showAddModal}
                onClose={closeModal}
                onSubmit={handleAddProduct}
                brands={brands}
                isAdding={isAdding}
            />
            <EditProductModal
                product={modalState.editProduct}
                onClose={closeModal}
                onSubmit={handleEditProductSubmit}
                brands={brands}
                isEditing={isEditing}
            />
        </div>
    );
};

export default Product;