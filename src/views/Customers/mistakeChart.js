import React, { Component } from 'react'
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

// Assets
import './ventsignals.css';


const Plot = createPlotlyComponent(Plotly);

class MistakeChart extends Component {

    

    calcularIncorrectas(respuestas, id){
        let data = new Array(10);
        data.fill(0);
        let dataset = [];

        respuestas.map(item => {
            if (item.id_caso == id) {

                for (let i = 0; i < item.respuesta_real.length; i++) {
                    
                    if (item.respuesta_sel[i].length >= 2) {
                        if (JSON.stringify(item.respuesta_sel[i]) != JSON.stringify(item.respuesta_real[i])) {
                            let pos = item.ids_q[i] - 1;
                            data[pos]++;
                        }
                    } else {

                        if (item.respuesta_sel[i] != item.respuesta_real[i]) {
                            let pos = item.ids_q[i] - 1;
                            data[pos]++;
                        }
                    }
                }   
            }
        })


        switch (id) {
            case "1":
                dataset = {
                    titulo: 'Caso 1',
                    data: data
                }
                break;

            case "2":
                dataset = {
                    titulo: 'Caso 2',
                    data: data
                }
                break;

            case "3":
                    dataset = {
                        titulo: 'Caso 3',
                        data: data
                    }
                break;
        
            case "4":
                dataset = {
                    titulo: 'Caso 4',
                    data: data
                }
                break;
        
            default:
                break;
        }
        
        return dataset;

        
    }

    render() {
        let valores = this.calcularIncorrectas(this.props.respuestas, this.props.id_caso)
        let ejeTitle = this.props.ejeTitle
        
        var trace1 = {
            x: ['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10'],
            y: valores.data,
            name: 'Errores',
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
          
  
          var data = [trace1];

          const layout = {
            title: valores.titulo,
            
            xaxis: {
                title: ejeTitle,
                showgrid: true,
                showline: false,
                },
            yaxis: {
                title: 'Errores',
                showgrid: true,
                showline: false,
                },
            
           
            height: 150,
            margin: {
              l: 50,
              r: 50,
              b: 50,
              t: 30,
              pad: 0
            },
          
            
            legend: {
                    font: {
                      size: 10,
                    },
                    "orientation": "h",
                    x: 0,
                    y: 1.5
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
                    data = {data}
                    layout={layout}
                    config={config} 
                   
                        
                    />
            </div>
        )
    }
}

export default MistakeChart;