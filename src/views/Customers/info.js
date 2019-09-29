import React, { Component } from 'react'; 
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  Button, Collapse, Table } from 'reactstrap';
import CajasBigotes from './cajasBigotes';
import RateChart from './rateChart';
import MistakeChart from './mistakeChart';
import TotalChart from './totalChart';
import DatatablePage from './Datatable';
import {mean,round} from 'mathjs';



class Info extends Component { 
    
    constructor(){
        super();
        this.state = {
            _id: '',
            respuestas: [],
            ids_casos: [0 ,0 ,0 ,0],  
            notas: [],
            notas_aprobados: [],
            notas_reprobados: [],
            collapse: false
        };
       
        
      
    }

    async componentDidMount(){
        await this.fetchTasks();
        
    }

    async fetchTasks(){  // Para consultar la base de datos y leer los registros
        const result = await fetch('/api/anatomia-fisiologia/estadistica/tasks')
        const json = await result.json();
        this.setState({respuestas: json})
        

    }

    
      changeState(respuesta){

        if (window.confirm('Confirme el envio del reporte al estudianete: ' + respuesta.usuario)){
            if (respuesta.estadoReporte == "Sin enviar") {
                respuesta.estadoReporte = "Enviado"
            }
    
            fetch(`/api/anatomia-fisiologia/estadistica/${respuesta._id}`,{
                method: 'PUT',
                body: JSON.stringify(respuesta),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.fetchTasks();
            }); 
        }
    }

    calcularNota(respuesta_real, respuesta_sel){
        console.log(respuesta_sel);
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

    contarCasos(id){
        
        switch (id) {
            case "1":
                this.state.ids_casos[0]++ 
                break;
            case "2":
                this.state.ids_casos[1]++
                break;
            case "3":
                this.state.ids_casos[2]++ 
                break;
            case "4":
                this.state.ids_casos[3]++    
                break;
            default:
                break;
        }
    } 

    
   

    dataBox(respuestas){

        var data1 = []
        var data2 = []
        var data3 = []
        var promData3 = []
        
        respuestas.map(item => {
            var nota = this.calcularNota(item.respuesta_real, item.respuesta_sel)
            data3.push(nota)
            
            if (nota >= 3.0) {
                data1.push(nota)
            } else {
                data2.push(nota)
            }
        })


        
        this.state.notas = data3;
        this.state.notas_aprobados = data1;
        this.state.notas_reprobados = data2;
       

        if (data3.length === 0){
            promData3 = 0;
        }else {
            promData3 = round(mean(this.state.notas),2);
        }
        

        return promData3;
        
    }

    calcularFaltantes(respuestas){


        let data = new Array(2);
        let inscritos = 100;
        data.fill(0);

        data[0]= respuestas.length
        data[1]= inscritos - (respuestas.length)
        return data;

    }

    render(){
        let page;
        let respuestas = this.state.respuestas;
        if (respuestas.length === 0){
            page = <div>hola</div>
        }else {
            console.log(respuestas);
            let numSend = 0;
            let valores = this.calcularFaltantes(this.state.respuestas);
            //this.dataBox(this.state.respuestas) 
            respuestas.map (respuesta => {
                if (respuesta.estadoReporte === 'Enviado'){
                    console.log(numSend);
                    numSend++
                }
            });
            page = <div>
                <Row>
            <Col sm ='3'>
               <Card>
                   <CardBody>
                       
                       <CardTitle  className = 'text-center'><strong>Número de Evaluados</strong></CardTitle>
                       <Row>
                        <Col sm ='6'>
                            <i className ="fa fa-users" style = {{fontSize: '40px'}}> </i>
                        </Col>
                        <Col sm ='6'>
                            <h1>{valores[0]}</h1>
                        </Col>
                       </Row>
                       
                   </CardBody>
                </Card> 
            </Col>
            <Col sm ='3'>
               <Card>
                   <CardBody>
                       <CardTitle  className = 'text-center'><strong>Promedio de Nota</strong></CardTitle>
                       <Row>
                        <Col sm ='6'>
                            <i className ="fa fa-graduation-cap fa-10x" style = {{fontSize: '40px'}}> </i>
                        </Col>
                        <Col sm ='6'>
                            {0}
                        </Col>
                       </Row>
                       
                   </CardBody>
                </Card> 
            </Col>
            <Col sm ='3'>
               <Card>
                   <CardBody>
                       <CardTitle  className = 'text-center'> <strong>Reportes Enviados</strong> </CardTitle>
                       <Row>
                        <Col sm ='6'>
                            <i className ="fa fa-envelope-open" style = {{fontSize: '40px'}} > </i>
                        </Col>
                        <Col sm ='6'>
                            <h1>{numSend}</h1>
                        </Col>
                       </Row>
                   </CardBody>
                </Card> 
            </Col>
            <Col sm ='3'>
               <Card>
                   <CardBody>
                       <CardTitle  className = 'text-center'><strong>Reportes por Enviar</strong></CardTitle>
                       <Row>
                        <Col sm ='6'>
                            <i className ="fa fa-envelope" style = {{fontSize: '40px'}}> </i>
                           
                        </Col>
                        <Col sm ='6'>
                            <h1>{valores[0]-numSend}</h1>
                        </Col>
                       </Row>
                   </CardBody>
                </Card> 
            </Col>
        </Row>
        <Row>
            <Col lg = '9' sm = '12' style={{ marginRight: '0px', paddingRight: '0px' }}>
                <Row style={{ marginRight: '0px', paddingRight: '0px' }}>
                    <Col md = '12' sm = '12' style={{ marginLeft: '0px', paddingLeft: '1px' }}> 
                        <DatatablePage respuestas = {this.state.respuestas}/>
                    </Col>
                </Row>
                
            </Col>
            
            
        </Row>
            </div>
        }
        
        
        return (
    
        <div className="container-fluid">
            {page}
            
        </div>
                  
        )
    }
}

export default Info;