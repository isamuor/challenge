import React, { Component } from 'react'
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

// Assets
import './charts.css';


const Plot = createPlotlyComponent(Plotly);

class CharCity extends Component {

    
    render() {
        let valores = this.props.data
       
        
        var trace1 = {
            x: valores[0],
            y: valores[1],
            name: 'Visits',
            type: 'bar',
            marker: {
                color: '#413174',
                opacity: 0.6,
                line: {
                  color: '#413174',
                  width: 1.5
                }
          }
        }
          
  
          var data = [trace1];

          const layout = {
            title: valores.titulo,
            
            xaxis: {
                title: 'Cities',
                showgrid: false,
                showline: false,
                tickangle: -45,
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: 'grey'
                  }
                
                },
            yaxis: {
                title: 'Visits',
                showgrid: false,
                showline: false,
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: 'grey'
                  }
                },
            
            
            margin: {
              l: 50,
              r: 50,
              b: 200,
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

export default CharCity;