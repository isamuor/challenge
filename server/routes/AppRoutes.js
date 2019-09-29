const express = require('express');
const router = express.Router();
const Country =  require('../models/countries');
const Representative =  require('../models/representatives');
const City =  require('../models/city');
const State =  require('../models/state');



router.post('/sales', async (req,res) => {
    const {names} = req.body;

    const representative = new Representative ({
        names,
        
    });
    await representative.save();
    res.json({status: 'Task saved'});
    

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