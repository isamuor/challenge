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

} from 'reactstrap';

class CreditInfo extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      client: 'new',
      available: null,
      totalVisit: null,
      net:null,
    };
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.props.changeInput({name,value})
    if (this.state.client === 'new'){
      document.getElementById("available").value = value;
      this.props.changeInput({name:"available",value})
    }else{
      document.getElementById("available").value = value-(this.state.net*this.state.totalVisit);
      this.props.changeInput({name:"available",value:value-(this.state.net*this.state.totalVisit)})
    }
    

  };

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
                      <Input type="number" id="credit" name="limit" placeholder="Credit Limit" onChange={(event) => this.handleChange(event)}/>
                    </InputGroup>
                    <FormText className="help-block">Please used only numbers</FormText>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-dollar"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="available" name="available" placeholder="Available Credit" disabled/>
                    </InputGroup>
                  </FormGroup>
                  
                  </CardBody>
                  </Card>
            </Col>
      
    )
  }
}

export default CreditInfo;
