import React, { Component } from 'react'
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

// Assets
import './ventsignals.css';


const Plot = createPlotlyComponent(Plotly);

class TotalChart extends Component {
    
   
    calcularFaltantes(respuestas){


        let data = new Array(2);
        let inscritos = 100;
        data.fill(0);

        data[0]= respuestas.length
        data[1]= inscritos - (respuestas.length)
        return data;

    }

    render() {
        let valores = this.calcularFaltantes(this.props.respuestas)
        var data = [{
            values: valores,
            labels: ['Evaluados', 'No Evaluados'],
            type: 'pie',
            marker: {
                colors: ['green','grey']
              },
          }];
          
          const layout = {          
            
            height: 200,
            margin: {
              l: 10,
              r: 10,
              b: 5,
              t: 10,
              pad: 0
            },
          
            
            legend: {
                    font: {
                      size: 12,
                    },
                    "orientation": "h",
                    x: 0,
                    y: 1.4
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

export default TotalChart;

