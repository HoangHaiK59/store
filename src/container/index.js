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
import Tops from '../components/Tops';
import Category from '../components/Category';
import Winter from '../components/Dress/skirt';
import Accessories from '../components/Accessories';
import Login from '../components/Login';
import useSticky from '../utils/sticky';
import Progress from '../components/ProgressBar';
import AddProduct from '../components/Admin/Product/Add';
import Jacket from '../components/Tops/jacket';
import Shirts from '../components/Tops/shirts';
import TShirts from '../components/Tops/tshirts';
import Jean from '../components/Pants/jean';
import Shorts from '../components/Pants/shorts';
import JumpSuit from '../components/Pants/jumpsuit';

const Container = (props) => {
    const { isSticky, element } = useSticky();
    return <div ref={element} className="root-container">
        <div className="root-mainview">
            <Progress  scroll={props.scrollPosition + '%'} />
            <header className={isSticky ? "root-navbar-fixed": "root-navbar" } style={props.isLanding ? {  backgroundColor: 'transparent' }: {  backgroundColor: '#000' }}>
                {
                    !props.isLanding && <Navbar isAuth = {props.isAuth}/>
                }
            </header>
            <main  className="root-content">
                <Switch>
                    <Route exact path="/" render={(props) => <Landing {...props} title="Landing" />} />
                    <Route exact path="/store" render={(props) => <Home {...props} title="Store" />} />
                    <Route exact path="/product/:id" render={(props) => <Product {...props} />} />
                    <Route exact path="/tops" render={(props) => <Tops {...props} />} />
                    <Route exact path="/tops/jacket" render={(props) => <Jacket {...props} />} />
                    <Route exact path="/tops/shirts" render={(props) => <Shirts {...props} />} />
                    <Route exact path="/tops/tshirts" render={(props) => <TShirts {...props} />} />
                    <Route exact path="/pants/jean" render={(props) => <Jean {...props} />} />
                    <Route exact path="/pants/short" render={(props) => <Shorts {...props} />} />
                    <Route exact path="/pants/jumpsuit" render={(props) => <JumpSuit {...props} />} />
                    <Route exact path="/category" render={(props) => <Category {...props} />} />
                    <Route exact path="/accessories" render={(props) => <Accessories {...props} />} />
                    <Route exact path="/login" render={(props) => <Login {...props} />} />
                    <Route exact path="/admin/addproduct" render={(props) => <AddProduct {...props} />} />
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