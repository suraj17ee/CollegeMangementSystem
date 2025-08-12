import React from "react";
import './About.css';

const About = () => {
    return (
        <div className="about-page container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-light text-black text-center rounded-top-4">
                            <h3 className="mb-0">Hi Everyone! 👋</h3>
                        </div>
                        <div className="card-body p-4">
                            <p className="fw-bold text-dark">
                                I am a <strong>Software Engineer</strong> with 3+ years of experience in 
                                Java, Spring Boot, Microservices, SQL, and MongoDB. 
                                Recently, I’ve been exploring modern frontend technologies such as 
                                HTML5, CSS3, JavaScript, and React.
                            </p>

                            <hr />

                            <h5 className="fw-bold text-dark">Tech Stack for this Project</h5>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item">Java 8, Spring Boot 3</li>
                                <li className="list-group-item">Spring Security 6</li>
                                <li className="list-group-item">SQL Database</li>
                                <li className="list-group-item">React Frontend</li>
                            </ul>

                            <h5 className="fw-bold text-dark">About CMS</h5>
                            <p>
                                CMS stands for <strong>College Management System</strong>. 
                                This application manages user data, allowing students to register, 
                                log in, and view their profiles. An <strong>Admin</strong> can 
                                update and delete user details, while role-based authentication 
                                ensures users see only what they’re authorized to.
                            </p>
                        </div>
                        <div className="card-footer text-center bg-light rounded-bottom-4">
                            <p className="mb-0 fw-bold text-secondary">
                                🚀 Thanks for visiting! Feel free to explore the content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
