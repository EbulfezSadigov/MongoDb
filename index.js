const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const bodyParser = require('body-parser');

mongoose.connect("mongodb+srv://abulfaz:ebulfez1995@cluster0.hnqdmkq.mongodb.net/products")

const productSchema = new Schema({
    name: String,
    price: Number,
    stock: String,
})

app.listen(8080, () => {
    console.log('Server is running!!');
})

const Product = mongoose.model('Product', productSchema);

app.post('/api/products',

    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty()

    , (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        var product = new Product({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
        });



        product.save();

        res.send('Success!!');

    })