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
    let {nit,name,address,phone,city,state,country,limit,available,percentage,visit,allID} = req.body;
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
        //console.log(allID.length);
        newClient.save()
        .then (data => {
            if(allID.length !== 0){
            //console.log('si lee');  
            /*allID.map((element,index) => {
                Costumer.findByIdAndUpdate(element,{available})
                if(index===0){
                    res.json({status: true, message: 'Client has been created'});
                }    
            })
            }else{
                res.json({status: true, message: 'Client has been created'});
            }*/
            Costumer.find()
            .then (data => {
                let count = 0;
                
                //let results = [];
                //console.log(data.length)
                data.forEach((element,index) => {
                    
                    bcrypt.compare(req.body.nit, element.nit).then(resp => {
                        count = count+1
                        //console.log(count);
                        if(resp){
                            console.log(index)
                            console.log(data.length)
                            //results.push(element)
                            //console.log(results);
                             Costumer.findByIdAndUpdate(element._id,{available})
                             .then(data =>{
                                //if(index+1 === data.length){
                                    //console.log('que pasa');                    
                                    res.json({status: true, message: 'Client has been created'});
                                //}
                             })
                             
                        } 
                        
                });
                
                })
        })} else {
            res.json({status: true, message: 'Client has been created'});
        }

 
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
    req.body.ides.map((element,index) => {
    bcrypt.hash(nit, saltRounds)
    .then(function(hash) {
        nit = hash; 
        Costumer.findByIdAndUpdate(element,{nit,name,address,phone,city,state,country,limit,available})
        .then (data => {
            if(index===0){
            res.json({status:true,message:'Information updated'});
            }
            
        })
        .catch (error => {
            console.log(error);
            res.json({status:false,message:'Verify information'});
        })
        })
    })
    
}