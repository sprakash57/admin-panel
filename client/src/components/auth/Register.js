import React from 'react';
import { useFormFields } from '../../libs/hooksLib';

const Register = () => {
    const [fields, handleInputChange] = useFormFields({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const handleSubmit = e => {
        e.preventDefault();
        if (fields.password !== fields.password2) {
            console.log("Password does not match")
        } else {
            console.log(fields);
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value={fields.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value={fields.email}
                        onChange={handleInputChange}
                    />
                    <small className="form-text">Use Gravatar email if you want user icon</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        required
                        value={fields.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        required
                        value={fields.password2}
                        onChange={handleInputChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </>
    )
}

export default Register;