import React, { Component } from 'react'; 
import { Card, CardBody, CardHeader,  Col, Row } from 'reactstrap';
import ChartCity from './chartCity';
import DatatablePage from './Datatable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Pdf from "react-to-pdf";

// Assets
import './charts.css';

const ref = React.createRef();
const options = {

    orientation: 'landscape',
    format: 'tabloid',
    
};

class Info extends Component { 
    
    constructor(){
        super();
        this.state = {
            information : null,
            cities: null,
            flag: false,
            flagPdf: false
        };
        this.handlePdf = this.handlePdf.bind(this);
    }

    async componentDidMount(){
        await this.fetchInfo();
        await this.fetchCities();
        
    }

    async fetchInfo(){  // Para consultar la base de datos y leer los registros
        const result = await fetch('/api/clients/view')
        const json = await result.json();
        //console.log(json)
        this.setState({information: json})
 
    }

    async fetchCities(){  // Para consultar la base de datos y leer los registros
        const result = await fetch('/api/cities/city')
        const json = await result.json();
        this.setState({ciudades: json, flag: true})
        
 
    }

    handlePdf(){
                  
        var top_left_margin = 15;
          const printArea = document.getElementById("page");
          //html2canvas(document.querySelector("#page")).then(canvas => {  
          html2canvas(printArea).then(canvas => {
          document.body.appendChild(canvas);  // if you want see your screenshot in body.
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape');
          pdf.addImage(imgData, 'PNG',top_left_margin, top_left_margin, 600, 600);
          pdf.save("download.pdf"); 
      });
    
      }

    render(){
        if (this.state.flag){
            const dataCity = conteoCity(this.state.ciudades, this.state.information)
            //console.log(dataCity)
        }      
        
        return (
    
        <div className="container-fluid">
        
        <Row>
            <Col lg = '12' sm = '12' style={{ marginRight: '0px', paddingRight: '0px' }}>
                    
                    {this.state.flag ? (
                        <div>
                            <Row className = "d-flex flex-row-reverse" style = {{marginTop : '5px', marginRight: '10px'}}>
                               
                                    <Pdf  targetRef={ref} filename="Report.pdf" options={options} x={20} y={10} >
                                    {({ toPdf }) => <button className = "btn btn-outline-primary align-self-end" onClick={toPdf}>Generate Report</button>}
                                    </Pdf>
                                
                            </Row>
                            <div className = "row" ref = {ref} style = {{marginTop: '0px', paddingTop: '0px', marginBottom: '0px', paddingBottom: '0px',  maxwidth: '300mm', minHeight: '200mm',}}>
                     
 
                            <Col sm = '10' >
                            <Card className = 'border-0'>
                                <CardHeader style={{backgroundColor : 'white'}}><h1><strong> General Information</strong></h1> 
                                
                                </CardHeader>
                                <CardBody>
                                    <DatatablePage information = {this.state.information}/>
                                </CardBody>
                            </Card>
                            </Col>
                        
            
                            <Col sm = '12'>
                                <Card className = 'border-0' style = {{marginBottom: '0px', paddingBottom: '0px'}}>
                                    <CardHeader style={{backgroundColor : 'white'}}><h4><strong> Visits per City</strong></h4> </CardHeader>
                                    <CardBody style = {{marginBottom: '0px', paddingBottom: '0px'}}>
                                        <ChartCity data = {conteoCity(this.state.ciudades, this.state.information)}/>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col sm = '2' className = 'align-content-bottom'>
                            
                            </Col>
                            </div>
                            
                            </div>
                        
                            ) : (
                        <div><p>Loading...</p></div>  
                    )}
                     
                        
                   
              
                
            </Col>
             
        </Row>
            
        </div>
                  
        )
    }
}

export default Info;

function conteoCity(ciudades,information){
    const allcities = [];
    const conteo = [];
    ciudades.map(element => {
        element.names.map(ele => {
            allcities.push(ele)
            const result = information.filter(visit => visit.city === ele);
            conteo.push(result.length)
            
        })

    })
    
    return [allcities,conteo]
}

