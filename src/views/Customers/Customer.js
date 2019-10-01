import React, { Component } from 'react';
import {  Row } from 'reactstrap';


import Info from './info'

class Customer extends Component {
  constructor(){
    super();
    this.state = {
        
    };
    
}

  

  render() {
    
    return (
      <div className="animated fadeIn" id = "page">
        <Row>
          <Info/>
        </Row>
        
      </div>
    );
  }
}

export default Customer;
