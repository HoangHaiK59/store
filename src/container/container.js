import React from 'react';
import { Landing } from '../components/Landing';
import Home from '../components/Home';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Error } from '../components/Error';

export const Container = () => {
    return <div className="root-container">
        <div className="root-mainview">
            <div className="root-navbar">
                <Navbar />
            </div>
            <div className="root-content">
                <Switch>
                    <Route exact path="/" render={(props) => <Landing {...props} title="Store Landing"/>} />
                    <Route exact path="/store" render={(props) => <Home {...props} title="Store" />} />
                </Switch>
            </div>
        </div>
    </div>
}