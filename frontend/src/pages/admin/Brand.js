import React from 'react';

const Brand = () => {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Brands Management</h3>
            </div>
            <div className="card-body">
                <p className="text-muted">This is the brands management page.</p>
                <button className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Brand
                </button>
            </div>
        </div>
    );
};

export default Brand;