import React, { Component } from 'react'; 
import { MDBDataTable } from 'mdbreact';
import NumberFormat from 'react-number-format';


class DatatablePage extends Component {

    constructor(){
        super();
        this.state = {
            
            
        };
        this.handleDelete = this.handleDelete.bind(this);
      
    }

    handleDelete(respuesta){

        if (window.confirm('Are you sure?')){
            //console.log(respuesta._id);
    
            fetch(`/api/clients/${respuesta._id}`,{
                method: 'delete',
                
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                window.location.reload();
            }); 
        }
    }

    render(){

    const filas = [];
    const information = this.props.information;
    information.map (respuesta => {
        filas.push({
            
            fullname: respuesta.name,
            address: respuesta.address,
            phone: respuesta.phone,
            city:respuesta.city,
            limit:<NumberFormat value={respuesta.limit} displayType={'text'} thousandSeparator={true} prefix={'$'} />,
            available:<NumberFormat value={respuesta.available} displayType={'text'} thousandSeparator={true} prefix={'$'} />,
            date: respuesta.visit.date,
            representative: respuesta.visit.representative,
            delete: <i className="fa fa-trash" onClick={() => this.handleDelete(respuesta)}></i>
                
        })
    })
         
    const data = {
    columns: [
      
      {
        label: 'Name',
        field: 'fullname',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Phone',
        field: 'phone',
        sort: 'asc',
        width: 150
      },
      
      {
        label: 'City',
        field: 'city',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Credit limit',
        field: 'limit',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Available credit',
        field: 'available',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Visit Date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Sales Representative',
        field: 'representative',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Delete',
        field: 'delete',
        sort: 'asc',
        width: 50
      },
    ],
    rows: filas
  };

  return (
    <MDBDataTable
      small
      responsive
      fixed
      entries={5}  
      entriesOptions={[ 5, 10, 15 ]} 
      data={data}
      style={{ marginRight: '0px', paddingRight: '0px' }}
    />
  );
}
}

export default DatatablePage;


