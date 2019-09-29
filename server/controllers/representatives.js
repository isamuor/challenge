const Representative =  require('./../models/representatives');

exports.list = async (req,res) => {  
    Representative.find()
    .then (data => {
        res.json(data);
        console.log('ingresó')
        //console.log(data);
    })
    .catch (error => {
        console.log(error);
    })
    
}