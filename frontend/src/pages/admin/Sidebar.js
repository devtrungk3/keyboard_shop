import React from 'react';
import {NavLink} from 'react-router-dom';


const Sidebar = () => {
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
            style={{width: '280px', height: '100vh'}}
        >
            <a
                href="/admin"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
                <i className="bi bi-gear-fill me-2 fs-4"></i>
                <span className="fs-4">Admin Panel</span>
            </a>
            <hr className="border-light"/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/admin/product"
                        className={({isActive}) =>
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
                        className={({isActive}) =>
                            `nav-link text-white ${isActive ? 'active bg-primary' : ''}`
                        }
                    >
                        <i className="bi bi-tags-fill me-2"></i>
                        Brands
                    </NavLink>
                </li>
            </ul>
            <hr className="border-light"/>
            <button className="btn btn-danger w-100">
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;