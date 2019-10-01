const Costumer =  require('../models/customer');
const bcrypt = require('bcrypt');

exports.list = async (req,res) => {  
    Costumer.find()
    .then (data => {
        res.json(data);
        
    })
    .catch (error => {
        console.log(error);
    })
    
}

exports.busca = async (req,res) => {     
    Costumer.find()
    .then (data => {
        let count = 0;
        let results = [];
        console.log(data.length)
        data.forEach((element,index) => {
            
            bcrypt.compare(req.body.nit, element.nit).then(resp => {
                count = count+1
                //console.log(count);
                if(resp){
                    results.push(element)
                    //console.log(results);
    
                } 
                if(count === data.length){
                    //console.log('Datos:'+ results);                    
                    res.send(results);
                }
        });
        
        })

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
        .then (data => {
            res.json({status: true, message: 'Client has been created'});
            
        })
        .catch (error => {
            res.json({status: false, message: 'Error to create a client all data must be completed'});
            console.log(error);
        })
        
        
    })
    .catch(function(error){
    console.log("Error: ");
    console.log(error);
    res.json({status:false,message: "Error to create a client"})
    });
    
    
}

exports.delete = async (req,res) => {
    Costumer.findByIdAndDelete(req.params._id)
    .then (data => {
        res.json({status: true, message: 'Client has been deleted'});
        
    })
    .catch (error => {
        res.json({status: true, message: 'Error to delete the client'});
        //console.log(error);
    })
    
    
}

exports.details = async (req,res) => {
    Costumer.findById(req.params._id)
    .then (data => {
        res.json(data);
        
    })
    .catch (error => {
        console.log(error);
    })
    
}

exports.update = async (req,res) => {
    const saltRounds = 10;
    let {nit,name,address,phone,city,state,country,limit,available,percentage,visit} = req.body;
    bcrypt.hash(nit, saltRounds)
    .then(function(hash) {
        nit = hash; 
        Costumer.findByIdAndUpdate(req.params._id,{nit,name,address,phone,city,state,country,limit,available,percentage,visit})
        .then (data => {
        
            res.json({status:true,message:'Information updated'});
            
        })
        .catch (error => {
            console.log(error);
            res.json({status:false,message:'Verify information'});
        })

    
        })
}