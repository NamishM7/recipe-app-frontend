import React, { useState } from 'react';
import axios from '../axios'; //Axios instance to interact with the backend

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/users/login' : '/users/register';
        try {
            const response = await axios.post(endpoint, formData);
            console.log('Response:', response.data);
            alert(isLogin ? "Login Successful!" : "Registration Successful!");
        } catch (err) {
            console.log(err);
            alert('Error occurred. Please try again.');
        }
    };
    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Username</label>
                        <input type='text' name='username' onChange={handleInputChange} required />
                    </div>
                )}
                <div>
                    <label>Email</label>
                    <input type='email' name='email' onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' onChange={handleInputChange} required />
                </div>
                <button type="submit">
                    {isLogin ? 'Login' : 'Signup'}
                </button>
            </form>
            <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Signup' : 'Login'}
                </button>
            </p>
        </div>
    );

};


export default Auth;