import React, {useState, useEffect} from 'react';

const AddBrandModal = ({onClose, onSubmit, show, isAdding}) => {
    const [formData, setFormData] = useState({
        brandName: '',
        description: '',
        logoUrl: '',
        website: ''
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
                        <h5 className="modal-title">Thêm thương hiệu mới</h5>
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
                                <div className="col-md-12">
                                    <label htmlFor="brandName" className="form-label">
                                        Tên thương hiệu
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="brandName"
                                        name="brandName"
                                        value={formData.brandName}
                                        onChange={handleChange}
                                        required
                                        disabled={isAdding}
                                    />
                                </div>
                                <div className="col-md-12">
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
                                    'Thêm thương hiệu'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EditBrandModal = ({brand, onClose, onSubmit, isEditing}) => {
    const [formData, setFormData] = useState({
        brandName: '',
        description: '',
        logoUrl: '',
        website: ''
    });

    useEffect(() => {
        if (brand) {
            setFormData({
                brandName: brand.brandName || '',
                description: brand.description || '',
                logoUrl: brand.logoUrl || '',
                website: brand.website || ''
            });
        }
    }, [brand]);

    if (!brand) return null;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(brand.brandId, formData);
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
                        <h5 className="modal-title">Sửa thương hiệu: {brand.brandName}</h5>
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
                                <div className="col-md-12">
                                    <label htmlFor="brandName" className="form-label">
                                        Tên thương hiệu
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="brandName"
                                        name="brandName"
                                        value={formData.brandName}
                                        onChange={handleChange}
                                        required
                                        disabled={isEditing}
                                    />
                                </div>
                                <div className="col-md-12">
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

export {AddBrandModal, EditBrandModal};