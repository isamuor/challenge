import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class VisitsInfo extends Component {
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
        
            <Col xs="12" md ="12">
            <Card className = 'border-0' style = {{marginTop: '10px'}}>
              <CardHeader style = {{backgroundColor: "white"}}>
                <strong>Visits Information</strong>
              </CardHeader>
              <CardBody>
                  
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="total">Visits Percentage</Label>
                    </Col> 
                    <Col md="10">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-percent"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="percent" name="percent" placeholder="Visits Percentage (0-100)"/>
                    </InputGroup>
                    <FormText className="help-block">Please used only numbers greater than 0</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="date">Date</Label>
                    </Col>
                    <Col md="10">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="date" id="date" name="date" placeholder="Date" />
                    </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="select">Sales Representative</Label>
                    </Col>
                    <Col md="10">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="respresentative" id="representative">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                    </InputGroup>
                    </Col>
                    
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="total">Net</Label>
                    </Col> 
                    <Col md="10">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-server"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="net" name="net" placeholder="Net" a/>
                    </InputGroup>
                    <FormText className="help-block">Please used only numbers greater than 0</FormText>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="total">Visit total</Label>
                    </Col> 
                    <Col md="10">             
                      <Input type="number" id="total" name="total" disabled />
                    </Col> 
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="textarea-input">Visit Description</Label>
                    </Col>
                    <Col xs="12" md="10">
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Content..." />
                    </Col>
                  </FormGroup>

                  </CardBody>
                  </Card>
            </Col>
      
    )
  }
}

export default VisitsInfo;
