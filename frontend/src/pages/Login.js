import { useState } from 'react';

import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:5000/api/v1/auth/login',
                formData
            );

            localStorage.setItem(
                'token',
                res.data.token
            );

            alert('Login Successful');

            navigate('/dashboard');
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Login Failed'
            );
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>
            </form>

            <br />

            <Link to="/register">
                Register Here
            </Link>
        </div>
    );
}

export default Login;