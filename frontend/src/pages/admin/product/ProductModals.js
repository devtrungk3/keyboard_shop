import React, {useState, useEffect} from 'react';
import {formatPrice} from './utils/formatPrice';

const ViewProductModal = ({product, onClose}) => {
    if (!product) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-lg animate__animated animate__zoomIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content shadow-lg border-0">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">{product.productName}</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="row g-4">
                            <div className="col-md-5">
                                <img
                                    src={product.imageUrl}
                                    alt={product.productName}
                                    className="img-fluid rounded shadow-sm"
                                    style={{objectFit: 'cover', maxHeight: '300px'}}
                                    onError={(e) =>
                                        (e.target.src = 'https://via.placeholder.com/300?text=Không+có+hình+ảnh')
                                    }
                                />
                            </div>
                            <div className="col-md-7">
                                <div className="card border-0">
                                    <div className="card-body p-0">
                                        <p className="mb-2">
                                            <strong>Thương hiệu:</strong>{' '}
                                            {product.brands?.brandName || 'Không có'}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Giá:</strong> {formatPrice(product.price)}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Số lượng:</strong> {product.quantity}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Mô tả:</strong> {product.description}
                                        </p>
                                        <p className="mb-0">
                                            <strong>Ngày tạo:</strong>{' '}
                                            {new Date(product.createdAt).toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddProductModal = ({onClose, onSubmit, show, brands, isAdding}) => {
    const [formData, setFormData] = useState({
        productName: '',
        brandId: '',
        price: '',
        quantity: '',
        description: '',
        imageUrl: '',
    });

    if (!show) return null;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-lg animate__animated animate__zoomIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content shadow-lg border-0">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">Thêm sản phẩm mới</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="productName" className="form-label">
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productName"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        required
                                        disabled={isAdding}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="brandId" className="form-label">
                                        Thương hiệu
                                    </label>
                                    <select
                                        className="form-select"
                                        id="brandId"
                                        name="brandId"
                                        value={formData.brandId}
                                        onChange={handleChange}
                                        required
                                        disabled={isAdding}
                                    >
                                        <option value="">Chọn thương hiệu</option>
                                        {brands.map((brand) => (
                                            <option key={brand.brandId} value={brand.brandId}>
                                                {brand.brandName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="price" className="form-label">
                                        Giá
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        disabled={isAdding}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="quantity" className="form-label">
                                        Số lượng
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        disabled={isAdding}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">
                                        Mô tả
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        disabled={isAdding}
                                    ></textarea>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="imageUrl" className="form-label">
                                        URL hình ảnh
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        disabled={isAdding}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                                disabled={isAdding}
                            >
                                Hủy
                            </button>
                            <button type="submit" className="btn btn-success" disabled={isAdding}>
                                {isAdding ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Đang thêm...
                                    </>
                                ) : (
                                    'Thêm sản phẩm'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EditProductModal = ({product, onClose, onSubmit, brands, isEditing}) => {
    const [formData, setFormData] = useState({
        productName: '',
        brandId: '',
        price: '',
        quantity: '',
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                productName: product.productName || '',
                brandId: product.brands?.brandId?.toString() || '',
                price: product.price?.toString() || '',
                quantity: product.quantity?.toString() || '',
                description: product.description || '',
                imageUrl: product.imageUrl || '',
            });
        }
    }, [product]);

    if (!product) return null;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(product.productId, formData);
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-lg animate__animated animate__zoomIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content shadow-lg border-0">
                    <div className="modal-header bg-warning text-dark">
                        <h5 className="modal-title">Sửa sản phẩm: {product.productName}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="productName" className="form-label">
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productName"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        required
                                        disabled={isEditing}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="brandId" className="form-label">
                                        Thương hiệu
                                    </label>
                                    <select
                                        className="form-select"
                                        id="brandId"
                                        name="brandId"
                                        value={formData.brandId}
                                        onChange={handleChange}
                                        required
                                        disabled={isEditing}
                                    >
                                        <option value="">Chọn thương hiệu</option>
                                        {brands.map((brand) => (
                                            <option key={brand.brandId} value={brand.brandId}>
                                                {brand.brandName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="price" className="form-label">
                                        Giá
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        disabled={isEditing}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="quantity" className="form-label">
                                        Số lượng
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        disabled={isEditing}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">
                                        Mô tả
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        disabled={isEditing}
                                    ></textarea>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="imageUrl" className="form-label">
                                        URL hình ảnh
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        disabled={isEditing}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                                disabled={isEditing}
                            >
                                Hủy
                            </button>
                            <button type="submit" className="btn btn-warning" disabled={isEditing}>
                                {isEditing ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Đang sửa...
                                    </>
                                ) : (
                                    'Lưu thay đổi'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export {ViewProductModal, AddProductModal, EditProductModal};