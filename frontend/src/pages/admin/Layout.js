import React from 'react';
import Sidebar from './Sidebar';
import Product from './product/Product';
import Brand from './brand/Brand';

const Layout = ({activePage, setActivePage}) => {
    const renderContent = () => {
        switch (activePage) {
            case 'products':
                return <Product/>;
            case 'brands':
                return <Brand/>;
            default:
                return (
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Dashboard</h3>
                        </div>
                        <div className="card-body">
                            <h1>Welcome to Admin Dashboard</h1>
                            <p className="text-muted">Select an option from the sidebar to manage products or
                                brands.</p>
                        </div>
                    </div>
                );
        }
    };

    const getPageTitle = () => {
        switch (activePage) {
            case 'products':
                return 'Products Management';
            case 'brands':
                return 'Brands Management';
            default:
                return 'Dashboard';
        }
    };

    return (
        <div className="d-flex">
            <Sidebar setActivePage={setActivePage} activePage={activePage}/>
            <div className="flex-grow-1 p-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light p-2 rounded-3">
                        <li className="breadcrumb-item">
                            <a href="#" className="text-decoration-none">Admin</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{getPageTitle()}</li>
                    </ol>
                </nav>
                {renderContent()}
            </div>
        </div>
    );
};

export default Layout;