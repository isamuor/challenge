const City =  require('../models/city');

exports.list = (req,res) => {
    City.find()
    .then (data => {
        res.json(data);
        //console.log('ingresó')
        //console.log(data);
    })
    .catch (error => {
        console.log(error);
    })
    
}