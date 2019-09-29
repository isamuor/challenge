import React, { Component } from 'react'; 
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  Button, Collapse, Table } from 'reactstrap';
import ChartCity from './chartCity';
import DatatablePage from './Datatable';




class Info extends Component { 
    
    constructor(){
        super();
        this.state = {
            information : null,
            cities: null,
            flag: false
        };
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
                        <Row>
                            
                            <Col sm = '12'>
                            <Card className = 'border-0'>
                                <CardHeader style={{backgroundColor : 'white'}}><h1><strong> General Information</strong></h1> </CardHeader>
                                <CardBody>
                                    <DatatablePage information = {this.state.information}/>
                                </CardBody>
                            </Card>
                            </Col>
                            <Col sm = '12'>
                                <Card className = 'border-0'>
                                    <CardHeader style={{backgroundColor : 'white'}}><h1><strong> Visits per City</strong></h1> </CardHeader>
                                    <CardBody>
                                        <ChartCity data = {conteoCity(this.state.ciudades, this.state.information)}/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
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