import React from 'react';

const ProductActions = ({product, onView, onEdit, onDelete}) => {
    return (
        <div className="btn-group" role="group">
            <button
                className="btn btn-outline-primary btn-sm me-2 shadow-sm"
                title="Xem chi tiết"
                onClick={() => onView(product)}
            >
                <i className="bi bi-eye"></i>
            </button>
            <button
                className="btn btn-outline-warning btn-sm me-2 shadow-sm"
                title="Sửa"
                onClick={() => onEdit(product)}
            >
                <i className="bi bi-pencil"></i>
            </button>
            <button
                className="btn btn-outline-danger btn-sm shadow-sm"
                title="Xóa"
                onClick={() => onDelete(product.productId)}
            >
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
};

export default ProductActions;