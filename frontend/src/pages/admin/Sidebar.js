import React from 'react';

const Sidebar = ({setActivePage, activePage}) => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
             style={{width: '280px', height: '100vh'}}>
            <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-gear-fill me-2 fs-4"></i>
                <span className="fs-4">Admin Panel</span>
            </a>
            <hr className="border-light"/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <button
                        className={`nav-link text-white ${activePage === 'products' ? 'active bg-primary' : ''}`}
                        onClick={() => setActivePage('products')}
                    >
                        <i className="bi bi-box-seam me-2"></i>
                        Products
                    </button>
                </li>
                <li>
                    <button
                        className={`nav-link text-white ${activePage === 'brands' ? 'active bg-primary' : ''}`}
                        onClick={() => setActivePage('brands')}
                    >
                        <i className="bi bi-tags-fill me-2"></i>
                        Brands
                    </button>
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