import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, Row, Alert} from 'reactstrap';

import PersonalInfo from './PersonalInfo';
import CreditInfo from './CreditInfo';
import VisitsInfo from './VisitsInfo';

class NewCustomer extends Component {
  constructor(props) {
    super(props);

    this.SubmitHandler = this.SubmitHandler.bind(this);

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
      status:null,
      message:null

    };
  }

 

  onChangeUserInput (data) {
    const name = data.name;
    const value = data.value;
    console.log(name)
    console.log(value)
    this.setState({[name]: value});
    
  }

  onChangeVisitInput (data) {
    const value = {date: data.date, representative: data.representative, net: data.net, totalVisit: data.totalVisit, description: data.description};
    console.log(value)
    this.setState({visit: value});
    
  }

  SubmitHandler = (event) => {
    event.preventDefault();
    this.fetchInput(this.state);
    
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
            <Col xs="12" >
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
            </Col>
        </div>
    )
  }
}

export default NewCustomer;