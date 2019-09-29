const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const stateSchema = new Schema ( {

    nameCountry: {
        type: String,
        required: true,
        trim: true,
    },
    names: {
        type: Array,
        required: true,
        trim: true,
    }
    

});

const State = mongoose.model('State', stateSchema);

module.exports = State;