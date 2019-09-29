import React, { Component } from 'react'

import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

// Assets
import './ventsignals.css';


const Plot = createPlotlyComponent(Plotly);

class CajasBigotes extends Component {

        
    render() {
        
        var trace1 = {
            y: this.props.notas,
            type: 'box',
            name: 'Total',
            boxmean: 'sd',
            marker: {
                color: 'black',
                opacity: 0.6,
                line: {
                  color: 'black',
                  width: 1.5
                }
          }
          };
          
        var trace2 = {
            y: this.props.notas1,
            type: 'box',
            name: 'Aprobados',
            boxmean: 'sd',
            marker: {
                color: 'green',
                opacity: 0.6,
                line: {
                  color: 'green',
                  width: 1.5
                }
          }
        };

        var trace3 = {
            y: this.props.notas2,
            type: 'box',
            name: 'Reprobados',
            boxmean: 'sd',
            marker: {
                color: 'red',
                opacity: 0.6,
                line: {
                  color: 'red',
                  width: 1.5
                }
          }
        };

        var data = [trace1, trace2, trace3];

        const layout = {
            
            xaxis: {
                title: '',
                showgrid: true,
                showline: false,
                },
            yaxis: {
                title: 'Notas',
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
                      size: 12,
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

export default CajasBigotes;