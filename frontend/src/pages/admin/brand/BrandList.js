import React from 'react';
import BrandActions from './BrandActions';

const BrandList = ({brands, onEdit, onDelete}) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-borderless align-middle">
                <thead className="table-dark">
                <tr>
                    <th scope="col" className="ps-4">#</th>
                    <th scope="col">Tên thương hiệu</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Ngày cập nhật</th>
                    <th scope="col" className="text-end pe-4">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {brands.map((brand, index) => (
                    <tr
                        key={brand.brandId}
                        className="animate__animated animate__fadeIn"
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        <td className="ps-4">{index + 1}</td>
                        <td>{brand.brandName || 'Không có tên'}</td>
                        <td>{brand.description || 'Không có mô tả'}</td>
                        <td>{new Date(brand.createdAt).toLocaleString('vi-VN')}</td>
                        <td>{new Date(brand.updatedAt).toLocaleString('vi-VN')}</td>
                        <td className="text-end pe-4">
                            <BrandActions
                                brand={brand}
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

export default BrandList;