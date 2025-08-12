import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-box text-light bg-success p-4">
            <div className="container">
                <div className="row">
                    
                    {/* Brand + Social Media */}
                    <div className="col-md-3 mb-3">
                        <h4 className="brand-title fw-bold">CMS</h4>
                        <div className="d-flex gap-3 mt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-youtube"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="col-md-3 mb-3">
                        <h5 className="footer-title fw-bold">SUPPORT</h5>
                        <a href="/contact" className="d-block text-light">Contacts</a>
                        <a href="/faq" className="d-block text-light">FAQs</a>
                    </div>

                    {/* Company */}
                    <div className="col-md-3 mb-3">
                        <h5 className="footer-title fw-bold">COMPANY</h5>
                        <a href="/terms" className="d-block text-light">Terms & Conditions</a>
                        <a href="/privacy" className="d-block text-light">Privacy & Cookie Policy</a>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3 mb-3">
                        <h5 className="footer-title fw-bold">CONTACT</h5>
                        <address>
                            <a href="tel:+12025550105" className="d-block text-light">📞 1-202-555-0105</a>
                            <a href="tel:+12025550106" className="d-block text-light">📞 1-202-555-0106</a>
                            <a href="mailto:help@cms.com" className="d-block text-light">✉ help@cms.com</a>
                        </address>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center border-top border-light pt-3 mt-3">
                    <small>© {new Date().getFullYear()} CMS. All Rights Reserved.</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
