const mongoose = require('mongoose')

const wineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    cost: {
        type: Number,
        default: 0,
    },
    color: {
        type: String,
        required: true,
        validate(value) {
            if (value.toLowerCase() !== "red" && value.toLowerCase() !== "white") {
                throw new Error('Wines have to be red or white')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',

    }
}, {
    timestamps: true,

})


const Wine = mongoose.model('Wine', wineSchema)

module.exports = Wine