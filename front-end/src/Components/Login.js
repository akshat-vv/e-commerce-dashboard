import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })


    const handleLogin = async () => {
        try {
            const result = await fetch('http://localhost:5000/login', {
                method: 'post',
                body: JSON.stringify({
                    email, password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (result.ok) {
                const response = await result.json();
                if (response.auth) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    localStorage.setItem('token', JSON.stringify(response.auth));
                    navigate('/');
                }
            } else {
                console.error('Login failed:', result.statusText);
            }
        } catch (err) {
            console.error('An error occurred during login:', err);
        }
    }

    return (
        <div className="d-flex flex-column  w-25 mt-5">
            <h3 className='mb-4'>Login</h3>
            <input
                type="text"
                placeholder="Enter Email"
                className="mb-3 p-2 border-1 border-light-subtle  rounded-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                className="mb-3 p-2 border-1 border-light-subtle  rounded-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleLogin}>Sign Up</button>
        </div>
    )
}

export default Login