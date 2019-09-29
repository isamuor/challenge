//Dependencies
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

//components
import App from './App';
import Customer from './views/Customers/Customer';
import NewCustomer from './views/NewCustomer/NewCustomer';


const AppRoutes = () => 
    <App>
        <Switch>
            <Route exact path = '/' component ={withRouter(Customer)} />
            <Route exact path = '/new' component ={withRouter(NewCustomer)} />
        </Switch> 
    </App>;



export default AppRoutes;
