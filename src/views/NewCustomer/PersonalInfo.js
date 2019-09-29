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

class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      countries: [],
      states: [],
      cities: [],
      flag: false,
    };
  }

  async componentDidMount(){
    await this.fetchCountry();
    await this.fetchState();
    await this.fetchCity();
    
  }

  async fetchCountry(){  // Para consultar la base de datos y leer los registros
      const result = await fetch('/api/countries/country')
      const json = await result.json();
      this.setState({countries: json})
    
  }
  
  async fetchState(){  // Para consultar la base de datos y leer los registros
    const result = await fetch('/api/states/state')
    const json = await result.json();
    this.setState({states: json})
  
  }

  async fetchCity(){  // Para consultar la base de datos y leer los registros
    const result = await fetch('/api/cities/city')
    const json = await result.json();
    this.setState({cities: json, flag: true})

  }



  render() {

    let isAvailable = this.state.flag;
    let optionItems
    if (isAvailable){
      let countries = this.state.countries[0].names;
      optionItems = countries.map((pais,index) =>
      <option value={toString(index+1)}>{pais}</option>
    )
    }else{
      optionItems = <option value="1">loading..</option>
    }
 
    return ( 
        
          <Col xs="12" md ="6" >
            <Card className = 'border-0' style = {{ marginTop: '10px'}}>
              <CardHeader style = {{backgroundColor: "white"}}>
                <strong>Personal Information</strong>
              </CardHeader>
              <CardBody>
               
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="Nit" name="nit" placeholder="NIT"/>
                    </InputGroup>
                    <FormText className="help-block">Please add the verification number without dash or spaces</FormText>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="username1" name="username1" placeholder="Full name" />
                    </InputGroup>
                  </FormGroup>
                      
       
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-address-card"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="address" name="address" placeholder="Address" />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-phone"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="phone" name="phone" placeholder="Phone" a/>
                    </InputGroup>
                    <FormText className="help-block">Please used only numbers</FormText>
                  </FormGroup>
                                    
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-map-marker"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="country" id="country">
                      <option value="0">Please select</option>
                      {/*<Opciones isAvailable={this.state.flag} countries={this.state.countries} />*/}
                        {optionItems}
                        
                      </Input>
                    </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">State</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-map-marker"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="state" id="state">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                    </InputGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">City</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-map-marker"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="city" id="city">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                    </InputGroup>
                    </Col>
                  </FormGroup>

                  </CardBody>
                  </Card>
            </Col>
        
    )
  }
}

export default PersonalInfo;

/*function Opciones(props) {
  const isAvailable = props.isAvailable;
  const countries = props.countries;
  if (isAvailable) {
      return  ("{countries[0].names.map((pais,index) => { return <option value={toString(index+1)}>{pais}</option>}})"
    )
  }else {
    return "<option value="1">loading..</option>"
  }

}*/

