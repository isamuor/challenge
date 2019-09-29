const calcularNota = (respuesta_real, respuesta_sel) => {
    let aciertos = 0
    for (let i = 0; i < respuesta_real.length; i++) {

        if (respuesta_sel[i].length >= 2) {
            
            if (JSON.stringify(respuesta_sel[i]) == JSON.stringify(respuesta_real[i])) {
                aciertos = aciertos + 1;
            } else{
            }

        } else {

            if (respuesta_sel[i] == respuesta_real[i]) {
                aciertos = aciertos + 1;
            } else {
            }
        }
      
    }
    let nota = (aciertos*5)/(respuesta_real.length)
    return nota;
}

const reporteEval = (estudiante, lista_q) => {

    let real = estudiante.respuesta_real;
    let chosen = estudiante.respuesta_sel;

    let nota = calcularNota(real, chosen)

    texto = `<h3> Resultado Evaluación Aplicación 1: anatomía y fisiología </h3> </br>
            <p> Datos usuario: </p>
            <ul>
                <li> Nombre: ${estudiante.usuario} </li>
                <li> Documento: ${estudiante.documento} </li>
                <li> Caso evaluado: ${estudiante.id_caso} </li>
            </ul> </br>
            <table style="border: 1px solid black; border-collapse: collapse;"> \
                <thead class='thead-dark'> \
                    <th style="border: 1px solid black; border-collapse: collapse;">Id pregunta</th> \
                    <th style="border: 1px solid black; border-collapse: collapse;">Enunciado</th> \
                    <th style="border: 1px solid black; border-collapse: collapse;">Respuesta Correcta</th> \
                    <th style="border: 1px solid black; border-collapse: collapse;">Respuesta Seleccionada</th> \
                </thead> \
            <tbody>`

    for (let i = 0; i < real.length; i++) {

        var preguntaObjeto = lista_q.find(list => list.id_q == estudiante.ids_q[i]);

        var texto_r = '';
        var texto_s = '';
        var enunciado = lista_q[estudiante.ids_q[i] - 1].enunciado;
        
        //Para llenar las respuestas reales
        if (i == 0) {
            switch (real[i]) {
                case '1':
                    texto_r = preguntaObjeto.opcion1
                    break;
    
                case '2':
                    texto_r = preguntaObjeto.opcion2
                    break;
                    
                case '3':
                    texto_r = preguntaObjeto.opcion3
                    break;
    
                case '4':
                    texto_r = preguntaObjeto.opcion4
                    break;
    
                default:
                    texto_r = 'no match'
                    break;
            }
        }else{
            if (real[i].length > 1) {
                switch (real[i][0]) {
                    case '1':
                        texto_r = preguntaObjeto.opcion1
                        break;
        
                    case '2':
                        texto_r = preguntaObjeto.opcion2
                        break;
                        
                    case '3':
                        texto_r = preguntaObjeto.opcion3
                        break;
        
                    case '4':
                        texto_r = preguntaObjeto.opcion4
                        break;
        
                    default:
                        texto_r = 'no match'
                        break;
                }

                switch (real[i][1]) {
                    case '1':
                        texto_r = texto_r + '; ' + preguntaObjeto.opcion1
                        break;
        
                    case '2':
                        texto_r = texto_r + '; ' + preguntaObjeto.opcion2
                        break;
                        
                    case '3':
                        texto_r = texto_r + '; ' + preguntaObjeto.opcion3
                        break;
        
                    case '4':
                        texto_r = texto_r + '; ' + preguntaObjeto.opcion4
                        break;
        
                    default:
                        texto_r = 'no match'
                        break;
                }

            }
            else{
                switch (real[i][0]) {
                    case '1':
                        texto_r = preguntaObjeto.opcion1
                        break;
        
                    case '2':
                        texto_r = preguntaObjeto.opcion2
                        break;
                        
                    case '3':
                        texto_r = preguntaObjeto.opcion3
                        break;
        
                    case '4':
                        texto_r = preguntaObjeto.opcion4
                        break;
        
                    default:
                        texto_r = 'no match'
                        break;
                }
            }
            
        }
        
        //Para llenar las respuestas escogidas por el usuario
        switch (chosen[i]) {
            case '1':
                texto_s = preguntaObjeto.opcion1
                break;

            case '2':
                texto_s = preguntaObjeto.opcion2
                break;
                
            case '3':
                texto_s = preguntaObjeto.opcion3
                break;

            case '4':
                texto_s = preguntaObjeto.opcion4
                break;

            default:
                if (chosen[i].length > 1) {
                    switch (chosen[i][0]) {
                        case '1':
                            texto_s = preguntaObjeto.opcion1
                            break;
            
                        case '2':
                            texto_s = preguntaObjeto.opcion2
                            break;
                            
                        case '3':
                            texto_s = preguntaObjeto.opcion3
                            break;
            
                        case '4':
                            texto_s = preguntaObjeto.opcion4
                            break;
            
                        default:
                            texto_s = 'no match'
                            break;
                    }

                    switch (chosen[i][1]) {
                        case '1':
                            texto_s = texto_s + '; ' +preguntaObjeto.opcion1
                            break;
            
                        case '2':
                            texto_s = texto_s + '; ' + preguntaObjeto.opcion2
                            break;
                            
                        case '3':
                            texto_s = texto_s + '; ' + preguntaObjeto.opcion3
                            break;
            
                        case '4':
                            texto_s = texto_s + '; ' + preguntaObjeto.opcion4
                            break;
            
                        default:
                            texto_s = 'no match'
                            break;
                    }

                }else{
                    texto_s = 'no match'
                }
                break;
        }

        if (real[i].length > 1) {
            if (JSON.stringify(real[i]) == JSON.stringify(chosen[i])) {
                texto = texto +
                        '<tr>' +
                        '<td style="border: 1px solid black; border-collapse: collapse;">'+ estudiante.ids_q[i] +'</td>' +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${enunciado}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${texto_r}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse; color: green">'${texto_s}'</td>` +
                        `</tr>` ;
            }else{
                texto = texto +
                        '<tr>' +
                        '<td style="border: 1px solid black; border-collapse: collapse;">'+ estudiante.ids_q[i] +'</td>' +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${enunciado}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${texto_r}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse; color: red">'${texto_s}'</td>` +
                        `</tr>` ;
            }
        } else {
            if (real[i] == chosen[i]) {
                texto = texto +
                        '<tr>' +
                        '<td style="border: 1px solid black; border-collapse: collapse;">'+ estudiante.ids_q[i] +'</td>' +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${enunciado}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${texto_r}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse; color: green">'${texto_s}'</td>` +
                        `</tr>` ;
            } else {
                texto = texto +
                        '<tr>' +
                        '<td style="border: 1px solid black; border-collapse: collapse;">'+ estudiante.ids_q[i] +'</td>' +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${enunciado}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse;">'${texto_r}'</td>` +
                        `<td style="border: 1px solid black; border-collapse: collapse; color: red">'${texto_s}'</td>` +
                        `</tr>` ;
            }
        }
    }

    texto = texto + `</tbody></table>`;
    texto = texto + `</br>
                     <p> <b> La calificación obtenida en esta evaluación es: ${nota} </b></p>`

    return texto;
}

module.exports = {
    calcularNota,
    reporteEval
}
