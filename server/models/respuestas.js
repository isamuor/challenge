const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const respuestaSchema = new Schema ( {

    usuario: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    documento: {
        type: Number,
        trim: true,
        required: true,
    },
    id_caso:{
        type: String,
        required: true,
        trim: true
    },
    ids_q:{
        type: Array,
        required: true,
        trim: true,
    },
    respuesta_sel: {
        type: Array,
        required: true,
        trim: true, 
    },
    respuesta_real: {
        type: Array,
        trim: true,
        required: true,
    },
    estadoReporte:{
        type: String,
        trim: true,
        default: "Sin enviar"
    }
});

const Respuesta = mongoose.model('Respuesta', respuestaSchema);

module.exports = Respuesta;