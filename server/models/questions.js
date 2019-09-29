const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const preguntaSchema = new Schema ( {

    id_c: {
        type: String,
        required: true,
        trim: true,
    },
    id_q:{
        type: String,
        required: true,
        trim: true,
    },
    num_op: {
        type: Number,
        required: true,
        trim: true,
    },
    enunciado: {
        type: String,
        required: true,
        trim: true,
    },
    opcion1: {
        type: String,
        required: true,
        trim: true,
    },
    opcion2: {
        type: String,
        required: true,
        trim: true,
    },
    opcion3: {
        type: String,
        required: true,
        trim: true,
    },
    opcion4: {
        type: String,
        required: false,
        trim: true,
    },
    opcion5: {
        type: String,
        required: false,
        trim: true,
    },
    opcion6: {
        type: String,
        required: false,
        trim: true,
    },
    opcion7: {
        type: String,
        required: false,
        trim: true,
    },
    opcion8: {
        type: String,
        required: false,
        trim: true,
    },
    tipo: {
        type: Number,
        required: true,
        trim: true, 
    },
    archivo: {
        type: Buffer,
        required: false,
    },
    respuesta: {
        type: Array,
        trim: true,
        required: false,
    }

});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

module.exports = Pregunta;