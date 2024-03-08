import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    },)

    const handleSignUp = async () => {
        console.log(name, email, password);
        const result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({
                name, email, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(result);
        const response = await result.json();
        localStorage.setItem('user', JSON.stringify(response.result));
        localStorage.setItem('token', JSON.stringify(response.auth));

        navigate('/')
        console.log(response);
    }

    return (
        <div className="d-flex flex-column  w-25 mt-5">
            <h3 className='mb-4'>Register</h3>
            <input
                type="text"
                placeholder="Enter Name"
                className="mb-3 p-2 border-1 border-light-subtle  rounded-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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
            <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;
