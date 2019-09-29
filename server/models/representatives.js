const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const representativeSchema = new Schema ( {

    names: {
        type: Array,
        required: false,
    }
    

});

const Representative = mongoose.model('Representative', representativeSchema);

module.exports = Representative;