import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
    <section>
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Contrivocial</h1>
                <p className="lead">A B2B portal for individual sellers, small businneses and Big Brands to collaborate and socialize.</p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                </div>
            </div>
        </div>
    </section>
)

export default Landing;