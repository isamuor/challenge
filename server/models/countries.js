const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const countrySchema = new Schema ( {

    names: {
        type: Array,
        required: false,
    }
    

});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;