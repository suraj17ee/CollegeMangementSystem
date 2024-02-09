import React from "react";

const About = () => {
    return (
        <div className="container-fluid">
            <div className="card border border-3 rounded">
                <div className="card-header">
                    <h5>Hii everyone !</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">I am a Software Engineer by profession with 3+ yrs of experience in Java, Spring, Spring Boot, Microservices, SQL, MongoDB etc. Currently i am exploring frontend technologies like HTML5, CSS3, JavaScript, React.</p>

                    <p className="card-text">In this project for backend developement java8, spring boot 3, for security spring security 6, for database SQL, for front end React i have used.</p>
                    <p className="card-text"><h6 className="card-title">About CMS</h6>
                        CMS stand for college management sytem. The name itself signifies that the application is about to deal with users data. A user can able to register itself and using their email and password (they have given at the time of registration), they can be able to login. In terms of successful authentication user can be able to see their profile with all the details they have provided.</p>
                    <p className="card-text"> An Admin user is also there, who has the authority to update and delete user details. If a user is logging in, at the time login itself their role will be authorised. If the role is USER then user can be able to see thier profile and if the user is an ADMIN then they can be able to see the dashboard specifically designed for ADMIN.</p>
                </div>
                <div className="card-footer">
                    Thanks ! Feel free to explore the content and enjoy your stay!
                </div>
            </div>
        </div>
    )
}

export default About;