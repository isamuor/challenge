import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class Login extends Component {
    constructor(){
      super();
      this.state = {
          user: '',
          password: '',
          flat: '0'
      };

      this.handleUserInput = this.handleUserInput.bind(this);
  }

  
  toggleLogin(event) {
    event.preventDefault();   
    
    this.setState({
        user: event.target.user.value,
        password: event.target.password.value 
        
    });
    
    }

    toggleClick() {
        
        this.props.submitButton(this.state)
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value, flat: '1'})
        
      }
  
    render() {
      return (
        
        <div className="container-fluid mt-5">
          <Row className='align-content-center'>
            <Col sm="12"  md={{size:4, offset:4}}>
                <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i><strong>Identifícate</strong>
                    
                </CardHeader>
                <CardBody>
                    <Form  onSubmit={this.toggleLogin.bind(this)}>
                        <FormGroup>
                            <Label for="user" hidden>Usuario</Label>
                            <Input  name="user" id="user" placeholder="Usuario" onChange={(event) => this.handleUserInput(event)}/>
                        </FormGroup>
                            {' '}
                            <FormGroup>
                            <Label for="Password" hidden>Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="Contraseña" onChange={(event) => this.handleUserInput(event)}/>
                        </FormGroup>
                            {' '}
                        <Button color="primary" type="submit" onClick = {this.toggleClick.bind(this)}>Enviar</Button>
                </Form>
                
                </CardBody>
                </Card>
            </Col>
            
          </Row>
        </div>
      );
    }
  }
  
  export default Login;


