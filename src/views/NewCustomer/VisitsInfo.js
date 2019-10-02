import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
  
} from 'reactstrap';

class VisitsInfo extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSalesInput = this.handleSalesInput.bind(this);
    
    this.state = {
      representatives: [],
      flag: false,
      percentage: null,
      date: null,
      representative: null,
      net: null,
      totalVisit: null,
      description: null
    };
  }

  async componentDidMount(){
    await this.fetchRepresentative();

  }

  async fetchRepresentative(){  // Para consultar la base de datos y leer los registros
    const result = await fetch('/api/representatives/sales')
    const json = await result.json();
    //console.log(json)
    this.setState({representatives: json, flag: true})
  
  }

  handleSalesInput (e) {
    
    const value = e.target.value;
    if (value === '0'){
      this.setState({representative: null}, () => { this.props.changeInputVisit(this.state) })
      
    }else {
      this.setState({representative: this.state.representatives[0].names[value-1]}, () => { this.props.changeInputVisit(this.state) })
      
    }
  
  }

  handleChange(e) {
    const name = e.target.name;
    
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.props.changeInputVisit(this.state) })
    if(name === 'net' && this.state.percentage !== null){
      document.getElementById("totalVisit").value = value*(this.state.percentage/1);
      this.setState({totalVisit:  value*(this.state.percentage)}, () => { this.props.changeInputVisit(this.state) })
    }
  };

  handleChange1(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value})
    this.props.changeInput({name,value})
    if(name === 'percentage' && this.state.net !== null){
      document.getElementById("totalVisit").value = this.state.net*(value/1);
      this.setState({totalVisit:  this.state.net*(value)}, () => { this.props.changeInputVisit(this.state) })
    }

  };

  

  render() {

    let isAvailable = this.state.flag;
    let optionItems
    
    if (isAvailable){
      let representatives = this.state.representatives[0].names;
      optionItems = representatives.map((representante,index) =>
      <option value={index+1}>{representante}</option>
    )
    }else{
      optionItems = <option value="1">loading..</option>
    }
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
                      <Input type="number" id="percent" name="percentage" placeholder="Visits Percentage (0-100)" requiered onChange={(event) => this.handleChange1(event)}/>
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
                      <Input type="date" id="date" name="date" placeholder="Date" requiered onChange={(event) => this.handleChange(event)}/>
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
                      <Input type="select" name="respresentative" id="representative" requiered  onChange={(event) => this.handleSalesInput(event)}>
                        <option value="0">Please select</option>
                        {optionItems}
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
                      <Input type="number" id="net" name="net" placeholder="Net" requiered onChange={(event) => this.handleChange(event)}/>
                    </InputGroup>
                    <FormText className="help-block">Please used only numbers greater than 0</FormText>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="total">Visit total</Label>
                    </Col> 
                    <Col md="10">             
                      <Input type="number" id="totalVisit" name="totalVisit" disabled />
                    </Col> 
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="textarea-input">Visit Description</Label>
                    </Col>
                    <Col xs="12" md="10">
                      <Input type="textarea" name="description" id="textarea-input" rows="9"
                             placeholder="Content..." requiered onChange={(event) => this.handleChange(event)} />
                    </Col>
                  </FormGroup>

                  </CardBody>
                  </Card>
            </Col>
      
    )
  }
}

export default VisitsInfo;
