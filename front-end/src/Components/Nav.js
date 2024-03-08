import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/signUp');
    };

    return (
        <div className="mt-3 d-flex justify-content-around ">
            {auth ? (
                <div>
                    <Link to="/" className="m-4 btn btn-light ">
                        Products
                    </Link>
                    <Link to="/add" className="m-4 btn btn-light ">
                        Add Product
                    </Link>
                    {/* <Link to="/update/id" className="m-4 btn btn-light ">
                        Update Product
                    </Link> */}
                    <Link to="/profile" className="m-4 btn btn-light">
                        Profile
                    </Link>
                    <Link to="/signUp" className="m-4 btn btn-danger " onClick={() => handleLogout()}>
                        Logout ({JSON.parse(auth).name})
                    </Link>

                </div>
            ) : (
                <div>
                    {!auth && (
                        <Link to="/signUp" className="m-4 btn btn-primary ">
                            SignUp
                        </Link>
                    )}
                    {!auth && (
                        <Link to="/login" className="m-4 btn btn-success">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Nav;
