import React from 'react';
import Landing from '../components/Landing';
import Home from '../components/Home';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Error } from '../components/Error';
import Product from '../components/Product';
import { Footer } from '../components/Footer';
import { connect } from 'react-redux';
import Contact from '../components/Contact';
import Collection from '../components/Collection';
import Women from '../components/Women';
import Spring from '../components/Collection/spring';
import Autumn from '../components/Collection/autumn';
import Summer from '../components/Collection/summer';
import Winter from '../components/Collection/winter';
import Accessories from '../components/Accessories';
import Login from '../components/Login';

const Container = (props) => {
    return <div className="root-container">
        <div className="root-mainview">
            <header className="root-navbar" style={props.isLanding ? {  backgroundColor: 'transparent' }: {  backgroundColor: '#000' }}>
                {
                    !props.isLanding && <Navbar isAuth = {props.isAuth}/>
                }
            </header>
            <main className="root-content">
                <Switch>
                    <Route exact path="/" render={(props) => <Landing {...props} title="Landing" />} />
                    <Route exact path="/store" render={(props) => <Home {...props} title="Store" />} />
                    <Route exact path="/product/:id" render={(props) => <Product {...props} />} />
                    <Route exact path="/collection" render={(props) => <Collection {...props} />} />
                    <Route exact path="/collection/spring" render={(props) => <Spring {...props} />} />
                    <Route exact path="/collection/autumn" render={(props) => <Autumn {...props} />} />
                    <Route exact path="/collection/summer" render={(props) => <Summer {...props} />} />
                    <Route exact path="/collection/winter" render={(props) => <Winter {...props} />} />
                    <Route exact path="/women" render={(props) => <Women {...props} />} />
                    <Route exact path="/accessories" render={(props) => <Accessories {...props} />} />
                    <Route exact path="/login" render={(props) => <Login {...props} />} />
                </Switch>
            </main>
            <footer>
                {
                    !props.isLanding && <Contact cover="https://i.imgur.com/Wj6dytl.jpg" />
                }
            </footer>
            {
                !props.isLanding && <Footer />
            }
        </div>
    </div>
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLanding: state.isLanding,
        isAuth: state.isAuth
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);