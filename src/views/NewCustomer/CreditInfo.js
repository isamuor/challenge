import React, { Component } from 'react';
import {
  
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';

class CreditInfo extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return ( 
       
            <Col xs="12" md ="6" >
            <Card className = 'border-0' style = {{marginTop: '10px'}}>
              <CardHeader style = {{backgroundColor: "white"}}>
                <strong>Credit Information</strong>
              </CardHeader>
              <CardBody>
                  
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-dollar"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="credit" name="credit" placeholder="Credit Limit" a/>
                    </InputGroup>
                    <FormText className="help-block">Please used only numbers</FormText>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-dollar"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="available" name="available" placeholder="Available Credit" a/>
                    </InputGroup>
                  </FormGroup>
                  
                  </CardBody>
                  </Card>
            </Col>
      
    )
  }
}

export default CreditInfo;
