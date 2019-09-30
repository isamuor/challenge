import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, Row, Alert, FormGroup,
    FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Label,} from 'reactstrap';
import DatatablePage from './Datatable';
//import PersonalInfo from './PersonalInfo';
//import CreditInfo from './CreditInfo';
//import VisitsInfo from './VisitsInfo';

class EditCustomer extends Component {
  constructor(props) {
    super(props);

    this.SubmitHandler = this.SubmitHandler.bind(this);
    this.SearchHandler = this.SearchHandler.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);

    this.state = {
      
      customer: null,
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
      status:null,
      message:null,
      isValid: false

    };
  }

 

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name)
    console.log(value)
    this.setState({[name]: value});
    
  }


  SubmitHandler = (event) => {
    event.preventDefault();
    this.fetchInput(this.state);
    
  }

  SearchHandler = (event) => {
    event.preventDefault();
    this.fetchSearchNit(this.state.nit);
    
  }


  async fetchSearchNit(data) {
        const input = JSON.stringify({nit: data});
        const result = await fetch('/api/clients/search', {
            method: 'post',
            headers: {'Content-Type':'application/json'}, 
            body: input, // data can be `string` or {object}!
        })
        const json = await result.json();
        this.setState({customer: json, isValid: true})
      
    }

  async fetchInput(data) {
    console.log(data);
    const result = await fetch('/api/clients/new', {
        method: 'post',
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify(data), // data can be `string` or {object}!
      })
    const json = await result.json();
    this.setState({status:json.status,message:json.message})
}


  render() {
    return ( 
        <div className="animated fadeIn">
            <Card style = {{marginTop: '10px'}}>
              <CardHeader>
                <strong>Edit Client Information</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
                  <Row>
                    <FormGroup>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" id="Nit" name="nit" placeholder="NIT" onChange={(event) => this.handleUserInput(event)}/>
                        </InputGroup>
                        <FormText className="help-block">Please add the verification number without dash or spaces</FormText>
                    </FormGroup>
                  </Row>
                  <Row>
                    <Button type="button" color="primary" onClick = {this.SearchHandler}><i className="fa fa-dot-circle-o"></i> Search</Button>
                  </Row>
                </Form>
               
              </CardBody>
            </Card>
            <Row style={{ marginRight: '0px', paddingRight: '0px' }}>
                    <Col md = '12' sm = '12' style={{ marginLeft: '0px', paddingLeft: '1px' }}> 
                    {this.state.isValid ? (
                        <Row>
                            <Col sm = '12'>
                            <Card className = 'border-0'>
                                <CardHeader style={{backgroundColor : 'white'}}><h1><strong> Clients Visits</strong></h1> </CardHeader>
                                <CardBody>
                                    <DatatablePage information = {this.state.customer}/>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                            ) : (
                        <div></div>  
                    )}
                        
                    </Col>
                </Row>
            {/*<Col xs="12" >
            <Card style = {{marginTop: '10px'}}>
              <CardHeader>
                <strong>Client Information</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >
                  <Row>
                    <PersonalInfo changeInput={this.onChangeUserInput.bind(this)}/>
                    <CreditInfo changeInput={this.onChangeUserInput.bind(this)}/>
                    <VisitsInfo changeInput={this.onChangeUserInput.bind(this)} changeInputVisit={this.onChangeVisitInput.bind(this)}/>
                  </Row>
                  <Row>
                    <Button type="button" color="primary" onClick = {this.SubmitHandler}><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
            </Col>*/}
        </div>
    )
  }
}

export default EditCustomer;