import React from 'react';
import Landing from '../components/Landing';
import Home from '../components/Home';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import { Error } from '../components/Error';
import Product from '../components/Product';
import { Footer } from '../components/Footer';
import { connect } from 'react-redux';
import Contact from '../components/Contact';
import Tops from '../components/Tops';
import Category from '../components/Category';
import Skirt from '../components/Dress/skirt';
import Dress from '../components/Dress';
import Accessories from '../components/Accessories';
import Login from '../components/Login';
import useSticky from '../utils/sticky';
import useDimensions from '../utils/dimensions';
import Progress from '../components/ProgressBar';
import Jacket from '../components/Tops/jacket';
import Shirts from '../components/Tops/shirts';
import TShirts from '../components/Tops/tshirts';
import Jean from '../components/Pants/jean';
import Shorts from '../components/Pants/shorts';
import JumpSuit from '../components/Pants/jumpsuit';
import Admin from '../components/Admin';
import Register from '../components/Login/register';
import Cart from '../components/Cart';

const Container = (props) => {
    const { isSticky, element } = useSticky();
    const { width, height } = useDimensions();
    const [scrollPosition, setScrollPosition] = React.useState(0);
    React.useEffect(() => {
        function calScrollDistance() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = getDocHeight();
            const  totalDocScrollLength  =  docHeight  -  windowHeight ;
            const  scrollPostion  =  Math.floor(scrollTop  /  totalDocScrollLength  *  100);
            setScrollPosition(scrollPostion)
          }
        
          function getDocHeight () {
            return Math.max(
              document.body.scrollHeight,  document.documentElement.scrollHeight,
              document.body.offsetHeight,  document.documentElement.offsetHeight,
              document.body.clientHeight,  document.documentElement.clientHeight
            );
          }
        function listenToScrollEvent () {
            document.addEventListener('scroll', () => {
              requestAnimationFrame(() => {
                  calScrollDistance();
              })
            })
          }
      listenToScrollEvent();
    }, []);
  
  
    return <div ref={element} className="root-container">
        <div className="root-mainview">
            <Progress  scroll={scrollPosition + '%'} />
            <header className={!props.isLanding? (isSticky ? "root-navbar-fixed": "root-navbar"): null } style={props.isLanding ? {  backgroundColor: 'transparent' }: {  backgroundColor: '#000' }}>
                {
                    !props.isLanding && <Navbar isMobile={width> 800 ? false: true} isAuth = {props.isAuth}/>
                }
            </header>
            <main  className="root-content">
                <Switch>
                    <Route exact path="/" render={(props) => <Landing isMobile={width> 800 ? false: true} {...props} title="Landing" />} />
                    <Route exact path="/home" render={(props) => <Home isMobile={width> 800 ? false: true} {...props} title="Store" />} />
                    <Route exact path="/product/:id" render={(props) => <Product isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/tops" render={(props) => <Tops {...props} isMobile={width> 800 ? false: true} />} />
                    <Route exact path="/jacket" render={(props) => <Jacket isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/shirts" render={(props) => <Shirts isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/tshirts" render={(props) => <TShirts isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/skirt" render={(props) => <Skirt isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/dress" render={(props) => <Dress isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/jean" render={(props) => <Jean isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/short" render={(props) => <Shorts isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/jumpsuit" render={(props) => <JumpSuit isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/category" render={(props) => <Category isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/accessories" render={(props) => <Accessories isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/login" render={(props) => <Login isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/register" render={(props) => <Register isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/admin" render={(props) => <Admin isMobile={width> 800 ? false: true} {...props} />} />
                    <Route exact path="/cart" render={(props) => <Cart isMobile={width> 800 ? false: true} {...props} />} />
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