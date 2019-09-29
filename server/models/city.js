const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const citySchema = new Schema ( {

    
    nameState: {
        type: String,
        required: false,
        trim: true,
    },
    names: {
        type: Array,
        required: false,
        trim: true,
    }
    

});

const City = mongoose.model('City', citySchema);

module.exports = City;