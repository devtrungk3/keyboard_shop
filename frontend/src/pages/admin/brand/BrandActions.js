import React from 'react';

const BrandActions = ({brand, onView, onEdit, onDelete}) => {
    return (
        <div className="btn-group" role="group" aria-label="Brand actions">
            <button
                type="button"
                className="btn btn-outline-warning btn-sm"
                onClick={() => onEdit(brand)}
                title="Sửa thương hiệu"
            >
                <i className="bi bi-pencil"></i>
            </button>
            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(brand.brandId)}
                title="Xóa thương hiệu"
            >
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
};

export default BrandActions;