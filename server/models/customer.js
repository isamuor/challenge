const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const costumerSchema = new Schema ( {

    
    nit: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,

    },
    phone:{
        type: Number,
        trim: true,
        required: true,
    },
    country:{
        type: String,
        required: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    limit:{
        type: Number,
        trim: true,
        required: true,
    },
    available:{
        type: Number,
        trim: true,
        required: true,
    },
    percentage:{
        type: Number,
        trim: true,
        required: false,
    },
    visit:{
        type: Object,
        trim: true,
        required: false,
    }
    

});

const Costumer = mongoose.model('Costumer', costumerSchema);

module.exports = Costumer;