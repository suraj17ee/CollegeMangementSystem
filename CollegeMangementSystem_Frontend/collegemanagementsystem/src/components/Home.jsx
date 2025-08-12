import React from "react";

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="p-5 mb-4 bg-light rounded-4 shadow-lg">
                <div className="container-fluid py-5">
                    <h1 className="display-4 fw-bold text-success">Welcome to CMS</h1>
                    <p className="col-md-8 fs-5 text-muted">
                        Manage all your user data in one place with ease and efficiency.
                        Simple. Fast. Reliable.
                    </p>
                    <button className="btn btn-success btn-lg shadow-sm px-4 mt-3">
                        Get Started 🚀
                    </button>
                </div>
            </div>

            <div className="row text-center mt-5">
                <div className="col-md-4">
                    <div className="card shadow border-0 p-3 h-100">
                        <h5 className="fw-bold text-success">📂 Centralized Data</h5>
                        <p className="text-muted">
                            Access and manage all user details from a single platform.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow border-0 p-3 h-100">
                        <h5 className="fw-bold text-success">⚡ Quick Access</h5>
                        <p className="text-muted">
                            Navigate through your content in just a few clicks.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow border-0 p-3 h-100">
                        <h5 className="fw-bold text-success">🔒 Secure</h5>
                        <p className="text-muted">
                            Your data is protected with top-level security measures.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
