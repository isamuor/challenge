import React, { Component } from 'react'; 
import { MDBDataTable } from 'mdbreact';
import { Button} from 'reactstrap';

class DatatablePage extends Component {

    constructor(){
        super();
        this.state = {
            ids_casos: [0 ,0 ,0 ,0]
            
        };
      
    }

    componentDidMount(){
        this.fetchTasks();
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

    calcularNota(respuesta_real, respuesta_sel){
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

    render(){

    const filas = [];
    const respuestas = this.props.respuestas;
    respuestas.map (respuesta => {
        this.contarCasos(respuesta.id_caso);
        //const nota = this.calcularNota(respuesta.respuesta_real, respuesta.respuesta_sel);
            if (respuesta.estadoReporte == "Sin enviar") {
                filas.push({
                doc: respuesta.documento,
                user: respuesta.usuario,
                mail: respuesta.email,
                case: respuesta.id_caso,
                value: 0,
                state: respuesta.estadoReporte,
                send: <Button size = 'sm' className="btn btn-info" name="id_q" onClick={() => this.changeState(respuesta)}> 
                    <i className="fas fa-mail-bulk"></i> Enviar
                    </Button>
            })
            }else {
                filas.push({
                    doc: respuesta.documento,
                    user: respuesta.usuario,
                    mail: respuesta.email,
                    case: respuesta.id_caso,
                    value: 0,
                    state: respuesta.estadoReporte,
                    send: '-'
                })
            }
        
        })
        
      console.log(filas);  
    const data = {
    columns: [
      {
        label: 'Documento',
        field: 'doc',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Usuario',
        field: 'user',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'mail',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Caso Evaluado',
        field: 'case',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Nota',
        field: 'value',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Estado Reporte',
        field: 'state',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Enviar',
        field: 'send',
        sort: 'asc',
        width: 150
      }
    ],
    rows: filas
  };

  return (
    <MDBDataTable
      small
      responsive
      fixed
      searchLabel="Buscar"
      paginationLabel={["Anterior", "Siguiente"]}
      infoLabel={["Visualizar", "a", "de", "datos"]}
      entriesLabel="Visualizar datos"
      entries={5}  
      entriesOptions={[ 5, 10, 15 ]} 
      data={data}
      style={{ marginRight: '0px', paddingRight: '0px' }}
    />
  );
}
}

export default DatatablePage;


