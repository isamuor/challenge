//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//components

import Main from './views/Container/Main';
import './App.scss';

class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };
    render () {
        const {children} = this.props;
        console.log(children);
        return (
        <div className='App'>
            
            <Main body = {children}/>
            
        </div>
        )
    }
}

export default App;