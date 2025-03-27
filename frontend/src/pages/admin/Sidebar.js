import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Xóa token khỏi localStorage
        navigate('/login'); // Chuyển hướng về trang đăng nhập
    };

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
            style={{ width: '280px', height: '100vh' }}
        >
            <div className="d-flex align-items-center justify-content-between">
                <a
                    href="/admin"
                    className="d-flex align-items-center text-white text-decoration-none"
                >
                    <i className="bi bi-gear-fill me-2 fs-4"></i>
                    <span className="fs-4">Admin</span>
                </a>
                {/* Icon Home nằm bên phải */}
                <Link to="/welcome" className="text-white">
                    <i className="bi bi-house-door-fill fs-4"></i>
                </Link>
            </div>
            <hr className="border-light" />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/admin/product"
                        className={({ isActive }) =>
                            `nav-link text-white ${isActive ? 'active bg-primary' : ''}`
                        }
                    >
                        <i className="bi bi-box-seam me-2"></i>
                        Products
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/admin/brand"
                        className={({ isActive }) =>
                            `nav-link text-white ${isActive ? 'active bg-primary' : ''}`
                        }
                    >
                        <i className="bi bi-tags-fill me-2"></i>
                        Brands
                    </NavLink>
                </li>
            </ul>
            <hr className="border-light" />
            {/* Button Logout */}
            <button className="btn btn-danger w-100" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
