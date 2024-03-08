const express = require('express');
require('./db/config');
const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();
const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const data = req.body;
    let user = new User(data);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({user}, jwtKey, {expiresIn: '2h'}, (err, token) => {
        if (err) {
            res.send({result: 'Something went wrong, Please try again'});
        } else {
            res.send({result, auth: token});
        }
    })
    // res.send(result);
});

app.post('/login', async (req, res) => {
    const data = req.body;
    if (data.email && data.password) {
        let user = await User.findOne(data).select("-password");
        if (user) {
            jwt.sign({user}, jwtKey, {expiresIn: '2h'}, (err, token) => {
                if (err) {
                    res.send({result: 'Something went wrong, Please try again'});
                } else {
                    res.send({user, auth: token});
                }
            })
        } else {
            res.send("No User Found");
        }
    } else {
        res.send("No Result found");
    }
})


app.post('/add-product', async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
})

app.get('/all-products', async (req, res) => {
    const result = await Product.find({});
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send({
            result: 'No Products in the List'
        })
    }
});

app.delete('/product/:id', async (req, res) => {
    data = req.params.id;
    const result = await Product.deleteOne({_id:data});
    res.send(result);
})

app.get('/product/:id', async (req, res) => {
    const data = req.params.id;
    // console.log(data);
    const result = await Product.find({_id: data});
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send({
            result: 'No Data Found'
        })
    }
});

app.put('/update/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const result = await Product.updateOne({_id: id}, {
        $set: data
    });
    res.send(result);
})

const verifyToken = (req, res, next) => {

    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        // console.log("MIDDLEWARE CODE", token);
        jwt.verify(token, jwtKey, (err,success) => {
            if (err) {
                res.status(401).send({result: 'Please provide valid Token'});
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({result: 'Please Send Token with Header'});
    }
    // console.log("MIDDLEWARE CODE", token);

}

app.get('/search/:key', verifyToken, async (req, res) => {
    const result = await Product.find({
        "$or": [
            {name: {$regex: req.params.key}}
        ]
    });
    res.send(result);
});


app.listen(5000);