import React from 'react';
import { Landing } from '../components/Landing/landing';
import {Home} from '../components/Home/home';
import { Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar/navbar';

export const Container = () => (
    <div className="root-container">
        <div className="root-mainview">
            <div className="root-navbar">
                <Navbar />
            </div>
            <div className="root-content">
                <Route exact path="/" render={() => <Landing />}/>
                <Route exact path="/shustore" render={() => <Home />}/>
            </div>
        </div>
    </div>
)