const State =  require('./../models/state')

exports.list = (req,res) => {
    State.find()
    .then (data => {
        res.json(data);
    })
    .catch (error => {
        console.log(error);
    })
    
}