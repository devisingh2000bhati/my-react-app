import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        mobile: '',
        birthDate: '',
        image: null,
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    //   Handle the validations function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        let validationErrors = {};

        if (!value.trim()) {
            validationErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required` ;
        } else {
            if (name === 'firstName' && !/^[A-Z][a-z]*$/.test(value)) {
                validationErrors[name] = 'First name should start with a capital letter and contain only alphabets';
            }
            if (name === 'lastName' && !/^[A-Z][a-z]*$/.test(value)) {
                validationErrors[name] = 'Last name should start with a capital letter and contain only alphabets';
            }
            if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
                validationErrors[name] = 'Invalid email address';
            }

            if (name === 'birthDate') {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(value)) {
                    validationErrors[name] = 'Invalid date format';
                }
                // else {
                //     // Additional logic to check if date is valid as per application requirements
                // }
            }

            if (name === 'mobile' && !/^\+d{10}$/.test(value)) {
                validationErrors[name] = 'Invalid mobile number';
            }
            if (name === 'password' && !/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,20}$/.test(value)) {
                validationErrors[name] = 'Password must be at least 6 characters long';
            }

            if (name === 'confirmPassword') {
                if (value !== formData.password) {
                    validationErrors[name] = 'Passwords do not match';
                }
                // else {
                //     validationErrors[name] = '';
                // }
            }
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Handle form submission
            // console.log('Form submitted:', formData);
        }
    };


    // Image Api Function 
    const handleImageChange = async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            image: e?.target?.files[0]
        });


        try {
            const response = await axios.post("http://18.209.67.211:5214/image", {
                imageUpload: e?.target?.files[0]
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrl = response?.data?.imageUrl;
            setFormData(prevState => ({
                ...prevState,
                image: imageUrl
            }));
            console.log(imageUrl)
            alert("Image Submitted")
        } catch (error) {
            console.error('Error uploading image:', error);
            alert("Error uploading image:" ,error)
        }
    };

    // Email Password or other filed
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("", { ...formData }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            // console.log(response?.data?.data)
            alert("From Submitted SuccessFully")
        } catch (error) {
            alert("failed to From")
        }
    };

    return (
        <>
            <div className='container'>
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className="error">{errors.gender}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                name="birthDate"
                                placeholder="Date of Birth"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                            {errors.birthDate && <span className="error">{errors.birthDate}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <span className="error">{errors.mobile}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                            />
                            {errors.image && <span className="error">{errors.image}</span>}
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;