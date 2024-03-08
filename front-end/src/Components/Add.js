import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router';

const Add = ({isUpdateFlow, id}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const [productFound, setProductFound] = useState(false);
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isUpdateFlow) {getProduct();}
    },[])

    const getProduct =async () => {
        const result = await fetch(`http://localhost:5000/product/${id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const response = await result.json();
        if (response.length > 0) {
            setProduct(response);
            setProductFound(true);
            console.log(response);
            setName(response[0].name);
            setPrice(response[0].price);
            setCompany(response[0].company);
            setCategory(response[0].category);
        } else {
            setProduct(response);
            setProductFound(false);
            console.log(response.result);
        }
    }


    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const auth = localStorage.getItem('user');
        console.log(JSON.parse(auth));
        const result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({
                name,price,category,company,userId:JSON.parse(auth)._id
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const response = await result.json();
        console.log(response);
        setName('');
        setPrice('');
        setCompany('');
        setCategory('');
        setError(false);
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const result = await fetch(`http://localhost:5000/update/${id}`, {
            method: 'put',
            body: JSON.stringify({
                name, price, company, category
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const response = await result.json();
        console.log(response);
        if (response) {
            navigate('/');
        }
    }

    if (isUpdateFlow && !productFound) {
        return <h2>{product.result}</h2>
    }

    return (
        <div className='d-flex flex-column '>
            <h4 className='mb-4'>{isUpdateFlow ? 'Update Product Details' : 'Add Product Details'}</h4>
            <form className='d-flex flex-column '>
                <div className='mb-3 d-flex flex-column '>
                    <input type="text" placeholder='Enter Product Name' value={name} onChange={(e) => setName(e.target.value)} />
                    {error && !name && <span className='text-danger small '>Please enter valid Name</span>}
                </div>
                <div className='mb-3 d-flex flex-column '>
                    <input type="text" placeholder='Enter Produt Price' className='' value={price} onChange={(e) => setPrice(e.target.value)} />
                    {error && !price && <span className='text-danger small '>Please enter valid Price</span>}
                </div>
                <div className='mb-3 d-flex flex-column '>
                    <input type="text" placeholder='Enter Product Category' className='' value={category} onChange={(e) => setCategory(e.target.value)} />
                    {error && !category && <span className='text-danger small '>Please enter valid Category</span>}
                </div>
                <div className='mb-3 d-flex flex-column '>
                    <input type="text" placeholder='Enter Product Company' className='' value={company} onChange={(e) => setCompany(e.target.value)} />
                    {error && !company && <span className='text-danger small '>Please enter valid Company</span>}
                </div>

                <button type='submit' className='btn btn-primary' onClick={(e) => {isUpdateFlow ? handleUpdateProduct(e) : handleAddProduct(e)}}>{isUpdateFlow ? 'Update Product ' : 'Add Product'}</button>
            </form>

            </div>
    )
}

export default Add