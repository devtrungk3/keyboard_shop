import React, {useState, useEffect} from 'react';
import {getBrands, addBrand, updateBrand, deleteBrand} from '../../../services/api';
import BrandList from './BrandList';
import {AddBrandModal, EditBrandModal} from './BrandModals';

const Brand = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({
        showAddModal: false,
        editBrand: null,
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
                const brandResponse = await getBrands();
                console.log('Dữ liệu thương hiệu từ API:', brandResponse);
                setBrands(brandResponse?.data || []);
            } catch (err) {
                setError(err.response?.data?.message || 'Không thể tải dữ liệu thương hiệu');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewBrand = (brand) => {
        setModalState({
            showAddModal: false,
            editBrand: null,
        });
    };

    const handleEditBrand = (brand) => {
        console.log('Thương hiệu được chọn để chỉnh sửa:', brand);
        setModalState({
            showAddModal: false,
            editBrand: brand,
        });
    };

    const handleOpenAddModal = () => {
        setModalState({
            showAddModal: true,
            editBrand: null,
        });
    };

    const closeModal = () => {
        setModalState({
            showAddModal: false,
            editBrand: null,
        });
    };

    const handleAddBrand = async (brandData) => {
        try {
            setIsAdding(true);
            const response = await addBrand(brandData);
            const newBrand = response.data;

            setBrands([...brands, newBrand]);
            closeModal();
            setToastMessage('Thêm thương hiệu thành công!');
            setShowToast(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Không thể thêm thương hiệu';
            setErrorMessage(message);
            setShowErrorToast(true);
        } finally {
            setIsAdding(false);
        }
    };

    const handleEditBrandSubmit = async (brandId, brandData) => {
        try {
            setIsEditing(true);
            const response = await updateBrand(brandId, brandData);
            const updatedBrand = response.data;

            setBrands(
                brands.map((brand) =>
                    brand.brandId === brandId ? updatedBrand : brand
                )
            );
            closeModal();
            setToastMessage('Sửa thương hiệu thành công!');
            setShowToast(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Không thể sửa thương hiệu';
            setErrorMessage(message);
            setShowErrorToast(true);
        } finally {
            setIsEditing(false);
        }
    };

    const handleDeleteBrand = async (brandId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa thương hiệu này?')) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteBrand(brandId);
            setBrands(brands.filter((brand) => brand.brandId !== brandId));
            setToastMessage('Xóa thương hiệu thành công!');
            setShowToast(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Không thể xóa thương hiệu';
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
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Thương hiệu</h3>
                        <button className="btn btn-success btn-sm shadow-sm" onClick={handleOpenAddModal}>
                            <i className="bi bi-plus-circle me-2"></i>Thêm thương hiệu
                        </button>
                    </div>
                    <div className="card-body p-4">
                        {brands.length === 0 ? (
                            <p className="text-muted text-center py-4">Không có thương hiệu nào.</p>
                        ) : (
                            <BrandList
                                brands={brands}
                                onEdit={handleEditBrand}
                                onDelete={handleDeleteBrand}
                            />
                        )}
                    </div>
                </div>
            )}

            <AddBrandModal
                show={modalState.showAddModal}
                onClose={closeModal}
                onSubmit={handleAddBrand}
                isAdding={isAdding}
            />
            <EditBrandModal
                brand={modalState.editBrand}
                onClose={closeModal}
                onSubmit={handleEditBrandSubmit}
                isEditing={isEditing}
            />
        </div>
    );
};

export default Brand;