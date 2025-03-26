import React from 'react';

const ProductActions = ({product, onView, onEdit, onDelete}) => {
    return (
        <div className="btn-group" role="group" aria-label="Product actions">
            <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => onView(product)}
                title="Xem chi tiết"
            >
                <i className="bi bi-eye"></i>
            </button>
            <button
                type="button"
                className="btn btn-outline-warning btn-sm"
                onClick={() => onEdit(product)}
                title="Sửa sản phẩm"
            >
                <i className="bi bi-pencil"></i>
            </button>
            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(product.productId)}
                title="Xóa sản phẩm"
            >
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
};

export default ProductActions;