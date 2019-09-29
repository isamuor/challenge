const Country =  require('./../models/countries');

exports.list = async (req,res) => {  
    Country.find()
    .then (data => {
        res.json(data);
        //console.log('ingresó')
        //console.log(data);
    })
    .catch (error => {
        console.log(error);
    })
    
}