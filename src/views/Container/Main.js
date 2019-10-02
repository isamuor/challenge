import React, { Component, Suspense } from 'react';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';


import Header from './Header';
import Footer from './Footer';
import Content from './Content';


class DefaultLayout extends Component {

    static propTypes = {
        body: PropTypes.object.isRequired
    };

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
    const {body} = this.props;
    return (
      <div className="app">
        <AppHeader fixed style={{ backgroundColor: 'white'}}>
          <Suspense  fallback={this.loading()}>
            <Header/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg" style={{ backgroundColor: '#414345'}}>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router} style={{ backgroundColor: '#414345' }}/>
            </Suspense>
            <AppSidebarFooter style={{ backgroundColor: '#D5EBF9' }} />
            <AppSidebarMinimizer style={{ backgroundColor: '#D5EBF9' }}/>
          </AppSidebar>
          <main className="main" style={{ backgroundColor: 'white' }}>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Content body = {body}/>
              </Suspense>
            </Container>
          </main>
          
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <Footer />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
