import React, { Component } from 'react'
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import {add} from 'mathjs';

// Assets
import './ventsignals.css';


const Plot = createPlotlyComponent(Plotly);


class RateChart extends Component {

    constructor(props){
        super(props)

        this.state ={
           
        }
    }

    calcularAprobados(respuestas){
        //Se crean arrays vacios de acuerdo al numero de casos y los lleno de ceros con la función fill
        let data1 = new Array(4)
        let data2 = new Array(4)
        let data = {};

        data1.fill(0);
        data2.fill(0);

        respuestas.map(item=> {
            var nota = this.props.calcularNota(item.respuesta_real, item.respuesta_sel)
             if (nota >= 3.0) {
                switch (item.id_caso) {
                    case "1":
                        data1[0]++
                        break;

                    case "2":
                        data1[1]++
                        break;

                    case "3":
                        data1[2]++
                        break;   

                    case "4":
                        data1[3]++
                        break;   

                    default:
                        break;
                }
            } else {
                switch (item.id_caso) {
                    case "1":
                        data2[0]++
                        break;

                    case "2":
                        data2[1]++
                        break;

                    case "3":
                        data2[2]++
                        break;   

                    case "4":
                        data2[3]++
                        break;   

                    default:
                        break;
                }
            }
        })
        
        data.total = add(data1, data2);
        data.aprobados = data1;
        data.reprobados = data2;
        
        
        return data
    }

    render() {
        let valores = this.calcularAprobados(this.props.respuestas);
        var trace1 = {
            x: ['Caso 1', 'Caso 2', 'Caso 3', 'Caso 4'],
            y: valores.aprobados,
            name: 'Aprobados',
            type: 'bar',
            marker: {
                color: 'green',
                opacity: 0.6,
                line: {
                  color: 'black',
                  width: 1.5
                }
          }
        }
          
          var trace2 = {
            x: ['Caso 1', 'Caso 2', 'Caso 3', 'Caso 4'],
            y: valores.reprobados,
            name: 'Reprobados',
            type: 'bar',
            marker: {
                color: 'red',
                opacity: 0.6,
                line: {
                  color: 'black',
                  width: 1.5
                }
            }
          };

          var trace3 = {
            x: ['Caso 1', 'Caso 2', 'Caso 3', 'Caso 4'],
            y: valores.total,
            name: 'Total',
            type: 'bar',
            marker: {
                color: 'black',
                opacity: 0.6,
                line: {
                  color: 'black',
                  width: 1.5
                }
          }
        }
          
          var data2 = [trace3, trace1, trace2];

          const layout = {
            
            xaxis: {
                title: '',
                showgrid: true,
                showline: false,
                },
            yaxis: {
                title: 'Número Estudiantes',
                showgrid: true,
                showline: false,
                },
            
           
            height: 300,
            margin: {
              l: 50,
              r: 5,
              b: 50,
              t: 50,
              pad: 0
            },
          
            
            legend: {
                    font: {
                      size: 10,
                    },
                    "orientation": "h",
                    x: 0,
                    y: 1.6
            }
        };

        const config = {
            showLink: false,
            displayModeBar: false,
            responsive: true,
            useResizeHandler: true,
         
                
        };


        return (
           <div>
               <Plot
                    className = "signals" 
                    data = {data2}
                    layout={layout}
                    config={config} 
                   
                        
                    />

           </div>
        )
    }
}

export default RateChart;