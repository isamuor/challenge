const express = require('express');
const router = express.Router();
const Pregunta =  require('./../models/questions');
const Respuesta =  require('./../models/respuestas');
const Caso =  require('./../models/caso');
const funciones = require('../funciones');
const nodemailer = require('nodemailer');

router.get('/tasks', async (req,res) => {
  
    const respuestas = await Respuesta.find();
    res.json(respuestas)
  
    
});

router.put('/:id', async (req,res) => {
    
    await Respuesta.findByIdAndUpdate(req.params.id, req.body).exec((err,result) => {
        if (err) {
            return console.log('Hay un error' + err); 
        }
        else{
            //let nota = funciones.calcularNota(result.respuesta_real, result.respuesta_sel);
            Pregunta.find({id_c: result.id_caso}).exec((err, respuesta) => {
                if (err) {
                    return console.log(err);
                }
                else{
                    let texto = funciones.reporteEval(result,respuesta);

                    var trasnporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'evaluacionappsgibic@gmail.com',
                            pass: 'appsgibic'
                        }
                    });

                    var mailOptions = {
                        from: 'GIBIC-UdeA <evaluacionappsgibic@gmail.com>',
                        to: result.email,
                        subject: 'Resultado evaluación',
                        text: 'Este es el resutlado de tu evaluación',
                        html: texto
                        //html: `<p> Este es el resutlado de tu evaluación: ${nota} </p> `
                    }

                    trasnporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    }else{
                        console.log('Mensaje enviado' + info.response);
                        }
                    })
                }
            });

 
        }
    });
    
    res.json({status: 'Task updated'})

})



module.exports = router;