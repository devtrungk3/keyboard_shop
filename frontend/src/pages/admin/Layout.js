import React from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="d-flex min-vh-100">
            <Sidebar/>
            <main className="flex-grow-1 p-3 bg-light">
                {/*render child route (product, brand)*/}
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;