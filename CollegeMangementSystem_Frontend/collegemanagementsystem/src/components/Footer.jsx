import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-box text-light bg-success">
            <div>
                <div className="brand-title">CMS</div>
                <div>
                    <span className="bi bi-facebook"></span>
                    <span className="bi bi-youtube"></span>
                    <span className="bi bi-twitter"></span>
                    <span className="bi bi-instagram"></span>
                    <span className="bi bi-linkedin"></span>
                </div>
            </div>
            <div>
                <div className="footer-title">SUPPORT</div>
                <div>Contacts</div>
                <div>FAQS</div>
            </div>
            <div>
                <div className="footer-title">COMPANY</div>
                <div>Terms & Conditions</div>
                <div>Privacy & Cookie Policy</div>
            </div>
            <div>
                <div className="footer-title">CONTACT</div>
                <address>
                    <div>1-202-555-0105</div>
                    <div>1-202-555-0106</div>
                    <div>help@cms.com</div>
                </address>
            </div>
        </div>
    )
}
export default Footer;