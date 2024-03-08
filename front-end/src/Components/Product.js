import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router';

const Product = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getProducts = async () => {
        const result = await fetch('http://localhost:5000/all-products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const response = await result.json();
        console.log(response);
        setProducts(response);
    };

    const handleDelete = async (id) => {
        const result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const response = result.json();
        if (response) {
            alert("DELETED");
            getProducts();
        }
    }

    const handleUpdate = async (id) => {
        navigate(`/update/${id}`);
    }

    useEffect(() => {
        getProducts();
    }, []);

    if (products.result) {
        return <div>{products.result}</div>;
    }

    const searchHandler = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        if (value) {
            const result = await fetch(`http://localhost:5000/search/${value}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            const response = await result.json();
            setProducts(response);
        } else {
            getProducts();
        }

    }


    return (
        // products.map((product) => {
        //     return <p>{product.name}</p>
        // }
        <div className='col-6'>
            <div className='d-flex justify-content-center '>

                <input type="search" placeholder='Search Product' className='my-3 w-50 p-2' onChange={(e)=>searchHandler(e)}/>
            </div>

            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 && products.map((product, index) => {
                        return (
                            <tr className=''>
                                <td scope='row'>{index+1}</td>
                                <td scope='row'>{product.name}</td>
                                <td scope='row'>{product.price}</td>
                                <td scope='row'>{product.category}</td>
                                <td scope='row'>{product.company}</td>
                                <td scope='row'><div className='d-flex justify-content-around '>
                                    <button className='btn btn-danger py-0' onClick={() => handleDelete(product._id)}>
                                        Delte
                                    </button>
                                    <button className='btn btn-secondary  py-0' onClick={() => handleUpdate(product._id)}>
                                        Update
                                    </button>
                                </div></td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>
            {
                products.length == 0 && <h1>No Product Found</h1>
            }
        </div>
    );
};

export default Product;
