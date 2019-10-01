import React, { Component } from 'react'; 
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  Button, Collapse, Table } from 'reactstrap';
import ChartCity from './chartCity';
import DatatablePage from './Datatable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Pdf from "react-to-pdf";


const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
    
};

class Info extends Component { 
    
    constructor(){
        super();
        this.state = {
            information : null,
            cities: null,
            flag: false
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
        console.log(json)
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
            console.log(dataCity)
        }      
        
        return (
    
        <div className="container-fluid">
        <Row>
            <Col lg = '12' sm = '12' style={{ marginRight: '0px', paddingRight: '0px' }}>
                <Row style={{ marginRight: '0px', paddingRight: '0px' }}>
                    <Col md = '12' sm = '12' style={{ marginLeft: '0px', paddingLeft: '1px' }}> 
                    {this.state.flag ? (
                        <div>
                        <Row>
                            <div id = "page">
                            <Col sm = '12' >
                            <Card className = 'border-0'>
                                <CardHeader style={{backgroundColor : 'white'}}><h1><strong> General Information</strong></h1> </CardHeader>
                                <CardBody>
                                    <DatatablePage information = {this.state.information}/>
                                </CardBody>
                            </Card>
                            </Col>
                        
                            </div>
                        </Row>
                            <div className = "row" ref={ref} id = "page">
                            <Col sm = '12'>
                                <Card className = 'border-0'>
                                    <CardHeader style={{backgroundColor : 'white'}}><h1><strong> Visits per City</strong></h1> </CardHeader>
                                    <CardBody>
                                        <ChartCity data = {conteoCity(this.state.ciudades, this.state.information)}/>
                                    </CardBody>
                                </Card>
                            </Col>
                            </div>
                            <Row>
                            <button onClick={this.handlePdf}>print</button>
                            <Pdf targetRef={ref} filename="code-example.pdf" options={options} x={.5} y={.5}>
                            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                            </Pdf>
                            </Row>
                            </div>
                        
                            ) : (
                        <div><p>Loading...</p></div>  
                    )}
                        
                    </Col>
                </Row>
                
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