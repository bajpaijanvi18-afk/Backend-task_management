import { useState } from 'react';

import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
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
            await axios.post(
                'http://localhost:5000/api/v1/auth/register',
                formData
            );

            alert('Registration Successful');

            navigate('/');
        } catch (error) {
            console.log(error.response);

            alert(
                error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                'Registration Failed'
            );
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br />
                <br />

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
                    Register
                </button>
            </form>

            <br />

            <Link to="/">
                Login Here
            </Link>
        </div>
    );
}

export default Register;