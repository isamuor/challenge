import React, { Component } from 'react'; 
import { MDBDataTable } from 'mdbreact';
import NumberFormat from 'react-number-format';
import { Button, Card, CardBody, CardHeader,  Form, Row, Alert} from 'reactstrap';

import PersonalInfo from './PersonalInfo';
import CreditInfo from './CreditInfo';
import VisitsInfo from './VisitsInfo';

class DatatablePage extends Component {

    constructor(){
        super();
        this.state = {
          nit: null,
          name: null,
          address: null,
          phone: null,
          country: null,
          state: null,
          city: null,
          limit: null,
          available: null,
          percentage: null,
          visit:[],
          isEdit: false,
          id: null,
            
        };
        this.handleModify = this.handleModify.bind(this);
        this.UpdateHandler = this.UpdateHandler.bind(this);

      
    }

    handleModify(respuesta){

      console.log(respuesta._id);
      fetch(`/api/clients/${respuesta._id}`,{
        method: 'get',
        
      })
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        this.setState({
          isEdit: true,
          _id: data._id,
          nit: this.props.nit,
          name: data.name,
          address: data.address,
          phone: data.phone,
          country: data.country,
          state: data.state,
          city: data.city,
          limit: data.limit,
          available: data.available,
          percentage: data.percentage,
          visit: data.visit,
          status: null,
          message:null

        })
      }); 
               
    }

    onChangeUserInput (data) {
      const name = data.name;
      const value = data.value;
      //console.log(name)
      //console.log(value)
      this.setState({[name]: value});
      
    }
  
    onChangeVisitInput (data) {
      const value = {date: data.date, representative: data.representative, net: data.net, totalVisit: data.totalVisit, description: data.description};
      //console.log(value)
      this.setState({visit: value});
      
    }

    UpdateHandler = (event) => {
      event.preventDefault();
      this.fetchInput(this.state);
      
    }

    async fetchInput(data) {
      console.log(data);
      const result = await fetch(`/api/clients/${data._id}`, {
          method: 'put',
          headers: {'Content-Type':'application/json'}, 
          body: JSON.stringify(data), // data can be `string` or {object}!
        })
      const json = await result.json();
      this.setState({status:json.status,message:json.message})
      if (json.status){
        this.props.changeStatus(this.state.nit)
      }
  }

    render(){

    const filas = [];
    const nit = this.state.nit;
    const information = this.props.information;
    let {name, address, phone, country, state, city, limit, available, percentage, visit } = this.state;

    //console.log(information);  
    if(information.length > 0){
    var noInfo = false
    information.map (respuesta => {
        filas.push({
            
            fullname: respuesta.name,
            address: respuesta.address,
            phone: respuesta.phone,
            city:respuesta.city,
            limit:<NumberFormat value={respuesta.limit} displayType={'text'} thousandSeparator={true} prefix={'$'} />,
            available:<NumberFormat value={respuesta.available} displayType={'text'} thousandSeparator={true} prefix={'$'} />,
            date: respuesta.visit.date,
            representative: respuesta.visit.representative,
            modify: <i className="fa fa-edit" onClick={() => this.handleModify(respuesta)}></i>
                
        })
    })
         
    var data = {
    columns: [
      
      {
        label: 'Name',
        field: 'fullname',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Phone',
        field: 'phone',
        sort: 'asc',
        width: 150
      },
      
      {
        label: 'City',
        field: 'city',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Credit limit',
        field: 'limit',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Available credit',
        field: 'available',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Visit Date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Sales Representative',
        field: 'representative',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Edit',
        field: 'modify',
        sort: 'asc',
        width: 50
      },
    ],
    rows: filas
  };
}else {
  noInfo = true;
}
  return (
    <div>
    { noInfo ? (
          <Alert color="danger">
            <h4 className="alert-heading">The client has no registered visits</h4>
          </Alert>
          ) : (
            <MDBDataTable
            small
            responsive
            fixed
            entries={5}  
            entriesOptions={[ 5, 10, 15 ]} 
            data={data}
            style={{ marginRight: '0px', paddingRight: '0px' }}
          />  
  )} 
  {
    this.state.isEdit ? (
      <div> 
        <Card style = {{marginTop: '10px'}}>
              <CardHeader>
                <strong>Client Information</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
                  <Row>
                    <PersonalInfo changeInput={this.onChangeUserInput.bind(this)} nit = {nit} name = {name} address = {address} phone = {phone} country = {country} state = {state} city = {city}/>
                    <CreditInfo changeInput={this.onChangeUserInput.bind(this)} limit= {limit} available = {available}/>
                    <VisitsInfo changeInput={this.onChangeUserInput.bind(this)} changeInputVisit={this.onChangeVisitInput.bind(this)} percentage = {percentage} visit = {visit}/>
                  </Row>
                  <Row>
                    <Button type="button" color="primary" onClick = {this.UpdateHandler}><i className="fa fa-dot-circle-o"></i> Update</Button>
                  </Row>
                </Form>
               
              </CardBody>
              {this.state.status === true &&
                <Alert color="success">
                  <h4 className="alert-heading">Well done!</h4>
                  <p>
                    {this.state.message}.
                  </p>
                </Alert>
              }
              {this.state.status === false &&
                <Alert color="danger">
                  <h4 className="alert-heading">Error!!</h4>
                  <p>
                    {this.state.message}.
                  </p>
                </Alert>
              }
          </Card>
      </div>
      ): (<div> </div>)
  }
  </div> 
  );
}
}

export default DatatablePage;


