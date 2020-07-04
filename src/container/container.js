import React from 'react';
import { Landing } from '../components/Landing';
import Home from '../components/Home';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Error } from '../components/Error';
import Product from '../components/Product';

export const Container = () => {
    return <div className="root-container">
        <div className="root-mainview">
            <div className="root-navbar">
                <Navbar />
            </div>
            <div className="root-content">
                <Switch>
                    <Route exact path="/" render={(props) => <Landing {...props} title="Landing"/>} />
                    <Route exact path="/store" render={(props) => <Home {...props} title="Store" />} />
                    <Route exact path="/product/:id" render={(props) => <Product {...props} />} />
                </Switch>
            </div>
        </div>
    </div>
}