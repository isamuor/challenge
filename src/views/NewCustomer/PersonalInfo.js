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
      selectedStates: [],
      selectedCities: [],
      stateSelected: false,
      citySelected: false,
      flag: false,
      flagCountry: false,
      flagState: false,
      flagCity: false,
    };

    this.handleCountryInput = this.handleCountryInput.bind(this);
    this.handleStateInput = this.handleStateInput.bind(this);
    this.handleCityInput = this.handleCityInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleCountryInput (e) {
    const value = e.target.value;
    console.log(value)
    if (value === '0'){
      this.setState({flagCountry: false, flagState: false})
      this.props.changeInput({name: 'country', value: []})
    }else {
      const selectedState = this.state.states.find(element => element.nameCountry === this.state.countries[0].names[value-1])
      this.setState({selectedStates: selectedState.names, stateSelected:true, citySelected:false, flagCountry: true, flagState: false, flagCity: false})
      this.props.changeInput({name: 'country', value: this.state.countries[0].names[value-1]})
    }
  
  }

  handleStateInput (e) {
    
    const value = e.target.value;
    console.log(value)
    if (value === '0'){
      this.setState({flagState: false})
      this.props.changeInput({name: 'state', value: []})
    }else {
      const selectedCity = this.state.cities.find(element => element.nameState === this.state.selectedStates[value-1])
      this.setState({selectedCities: selectedCity.names, stateSelected:false, citySelected:true, flagState: true, flagCity: false})
      this.props.changeInput({name: 'state', value: this.state.selectedStates[value-1]})
    
    }
  
  }

  handleCityInput (e) {
    
    const value = e.target.value;
    if (value === '0'){
      this.props.changeInput({name: 'city', value: []})
    }else {
      this.props.changeInput({name: 'city', value: this.state.selectedCities[value-1]})
      this.setState({flagCity:true})
    }
  
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
  
    this.props.changeInput({name,value})

};


  render() {
    
    let isAvailable = this.state.flag;
    let isSelectedCountry = this.state.flagCountry;
    let isSelectedState = this.state.flagState;
    let isSelectedCity = this.state.flagCity;
    let optionItems
    let optionItemsState
    let optionItemsCity


    if (isAvailable){
      let countries = this.state.countries[0].names;
      optionItems = countries.map((pais,index) =>
      <option value={index+1}>{pais}</option>
    )
    }else{
      optionItems = <option value="1">loading..</option>
    }

    if(isSelectedCountry){
      let states = this.state.selectedStates;
      optionItemsState = states.map((estado,index) =>
      <option value={index+1}>{estado}</option>
      )
    }else{
      optionItemsState = <option value="1">Select Country</option>
      
    }

    if(isSelectedState){
      let cities = this.state.selectedCities;
      if (!isSelectedCity){
        document.getElementById("city").value = "0";
      }
      optionItemsCity = cities.map((ciudad,index) =>
      <option value={index+1}>{ciudad}</option>
      )
    }else{
      optionItemsCity = <option value="1">Select State</option>
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
                      <Input type="number" id="Nit" name="nit" placeholder="NIT" onChange={(event) => this.handleChange(event)}/>
                    </InputGroup>
                    <FormText className="help-block">Please add the verification number without dash or spaces</FormText>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="username1" name="name" placeholder="Full name" onChange={(event) => this.handleChange(event)} />
                    </InputGroup>
                  </FormGroup>
                      
       
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-address-card"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="address" name="address" placeholder="Address" onChange={(event) => this.handleChange(event)}/>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-phone"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="phone" name="phone" placeholder="Phone" onChange={(event) => this.handleChange(event)}/>
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
                      <Input type="select" name="country" id="country" onChange={(event) => this.handleCountryInput(event)}>
                        <option value="0">Please select</option>
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
                      <Input type="select" name="state" id="state" onChange={(event) => this.handleStateInput(event)}>
                        <option value="0" selected={this.state.stateSelected}>Please select</option>
                        {optionItemsState}
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
                      <Input type="select" name="city" id="city" defaultValue="0"  onChange={(event) => this.handleCityInput(event)}>
                        <option value="0">Please select</option>
                        {optionItemsCity}
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



