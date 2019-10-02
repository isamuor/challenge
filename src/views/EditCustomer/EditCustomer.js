import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, Row,  FormGroup,
    FormText,  Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
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

  onChangeStatus (value) { 
    //console.log(name)
    //console.log(value)
    this.setState({nit: value});
    this.fetchSearchNit(this.state.nit);
    this.forceUpdate();
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name)
    //console.log(value)
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
        //console.log(json)
        this.setState({customer: json, isValid: true})
      
    }

  async fetchInput(data) {
    //console.log(data);
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
                <Form id = 'myForm' method="post" encType="multipart/form-data" className="form-horizontal" >
                  <Row>
                    <FormGroup>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" id="nit" name="nit" placeholder="NIT" onChange={(event) => this.handleUserInput(event)} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>
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
                                    <DatatablePage information = {this.state.customer} nit = {this.state.nit} changeStatus={this.onChangeStatus.bind(this)}/>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                            ) : (
                        <div></div>  
                    )}
                        
                    </Col>
                </Row>
            
        </div>
    )
  }
}

export default EditCustomer;