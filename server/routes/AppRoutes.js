const express = require('express');
const router = express.Router();
const Country =  require('../models/countries');
const City =  require('../models/city');
const State =  require('../models/state');



router.get('/paises', async (req,res) => {
    const pais = await Country.find();
    res.json(pais)
    

});

router.post('/pais', async (req,res) => {
    
    const {names} = req.body;

    const country = new Country ({
        names,
        
    });
    await country.save();
    res.json({status: 'Task saved'});
    
})

router.post('/ciudad', async (req,res) => {
    
    const nameState = req.body.nameState;
    const names = req.body.names;

    const city = new City ({
        nameState,
        names,
        
    });
    await city.save();
    res.json({status: 'Task saved'});
    
})

router.post('/estado', async (req,res) => {
    
    const nameCountry = req.body.nameCountry;
    const names = req.body.names;

    const state = new State ({
        nameCountry,
        names,
        
    });
    await state.save();
    res.json({status: 'Task saved'});
    
})

module.exports = router;