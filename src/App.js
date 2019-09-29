//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//components
import Header from './views/Container/Header';
import Footer from './views/Container/Footer';
import Content from './views/Container/Content';
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