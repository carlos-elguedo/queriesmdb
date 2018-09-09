const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        quantity: Number,
        status: Boolean,
        date: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Product', ProductSchema, 'product')