import React from 'react';
import ProductActions from './ProductActions';
import {formatPrice} from './utils/formatPrice';

const ProductList = ({products, onView, onEdit, onDelete}) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-borderless align-middle">
                <thead className="table-dark">
                <tr>
                    <th scope="col" className="ps-4">#</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Thương hiệu</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col" className="text-end pe-4">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr
                        key={product.productId}
                        className="animate__animated animate__fadeIn"
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        <td className="ps-4">{index + 1}</td>
                        <td>{product.productName}</td>
                        <td>{product.brands && product.brands.brandName ? product.brands.brandName : 'Không có'}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>
                                <span
                                    className={`badge rounded-pill ${
                                        product.quantity > 20
                                            ? 'bg-success'
                                            : product.quantity > 0
                                                ? 'bg-warning'
                                                : 'bg-danger'
                                    }`}
                                >
                                    {product.quantity}
                                </span>
                        </td>
                        <td className="text-end pe-4">
                            <ProductActions
                                product={product}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;