const Costumer =  require('../models/customer');
const bcrypt = require('bcrypt');

exports.list = async (req,res) => {  
    Costumer.find()
    .then (data => {
        res.json(data);
        //console.log('ingresó')
        //console.log(data);
    })
    .catch (error => {
        console.log(error);
    })
    
}

exports.create = async (req,res) => {
    const saltRounds = 10;
    let {nit,name,address,phone,city,state,country,limit,available,percentage,visit} = req.body;
    bcrypt.hash(nit, saltRounds)
    .then(function(hash) {
        nit = hash;
        const newClient = new Costumer ({
            nit,
            name,
            address,
            phone,
            city,
            state,
            country,
            limit,
            available,
            percentage,
            visit  
        });
        newClient.save()
        res.json({status: true, message: 'Client has been created'});
        
    })
    .catch(function(error){
    console.log("Error: ");
    console.log(error);
    res.json({status:false,message: "Error to create a client"})
    });
    
    
}