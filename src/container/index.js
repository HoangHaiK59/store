import React from 'react';
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
import Landing from '../components/Landing';
import Home from '../components/Home';
import Marketing from '../components/Marketing';
import Sidebar from '../components/Sidebar';
import { Layout } from 'antd';
import Social from '../components/Social';

const { Header, Content } = Layout;

const useDetect = () => {
    const [isMobile, setMobile] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener('resize', detect);
        return () => window.removeEventListener('resize', detect)
    })
    function detect() {
        const userAgent =
            typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(
            userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        );
        setMobile(mobile);
    }
    return { isMobile }
}

const Container = (props) => {
    const { isSticky, element } = useSticky();
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const { isMobile } = useDetect();
    React.useEffect(() => {
        function calScrollDistance() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = getDocHeight();
            const totalDocScrollLength = docHeight - windowHeight;
            const scrollPostion = Math.floor(scrollTop / totalDocScrollLength * 100);
            setScrollPosition(scrollPostion)
        }

        function getDocHeight() {
            return Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
        }
        function listenToScrollEvent() {
            document.addEventListener('scroll', () => {
                requestAnimationFrame(() => {
                    calScrollDistance();
                })
            })
        }
        listenToScrollEvent();
    }, []);

    return <div ref={element} className="root-container">
        <Layout>
            <Progress scroll={scrollPosition + '%'} />
            {
                !props.isLanding && <Header className={!props.isLanding ? isSticky ? "root-navbar-fixed" : "root-navbar" : null} style={props.isLanding ? { backgroundColor: 'transparent' } : { backgroundColor: '#fff' }}>
                    <Navbar isMobile={isMobile} isAuth={props.isAuth} />
                </Header>
            }
            <Content style={{position: 'relative', minHeight: '80vh'}}>
                {
                    // !props.isLanding && <Marketing />
                    !props.isLanding && <Sidebar />
                }
                {
                    !props.isLanding && <Social />
                }
                <Switch>
                    <Route exact path="/" render={(props) => <Landing isMobile={isMobile} {...props} title="Landing" />} />
                    <Route exact path="/home" render={(props) => <Home isMobile={isMobile} {...props} title="Store" />} />
                    <Route exact path="/product/:id" render={(props) => <Product isMobile={isMobile} {...props} />} />
                    <Route exact path="/tops" render={(props) => <Tops isMobile={isMobile} {...props} />} />
                    <Route exact path="/jacket" render={(props) => <Jacket isMobile={isMobile} {...props} />} />
                    <Route exact path="/shirts" render={(props) => <Shirts isMobile={isMobile} {...props} />} />
                    <Route exact path="/tshirts" render={(props) => <TShirts isMobile={isMobile} {...props} />} />
                    <Route exact path="/skirt" render={(props) => <Skirt isMobile={isMobile} {...props} />} />
                    <Route exact path="/dress" render={(props) => <Dress isMobile={isMobile} {...props} />} />
                    <Route exact path="/jean" render={(props) => <Jean isMobile={isMobile} {...props} />} />
                    <Route exact path="/short" render={(props) => <Shorts isMobile={isMobile} {...props} />} />
                    <Route exact path="/jumpsuit" render={(props) => <JumpSuit isMobile={isMobile} {...props} />} />
                    <Route exact path="/category" render={(props) => <Category isMobile={isMobile} {...props} />} />
                    <Route exact path="/accessories" render={(props) => <Accessories isMobile={isMobile} {...props} />} />
                    <Route exact path="/login" render={(props) => <Login isMobile={isMobile} {...props} />} />
                    <Route exact path="/register" render={(props) => <Register isMobile={isMobile} {...props} />} />
                    <Route exact path="/admin" render={(props) => <Admin isMobile={isMobile} {...props} />} />
                    <Route exact path="/cart" render={(props) => <Cart isMobile={isMobile} {...props} />} />
                </Switch>
            </Content>

            {
                !props.isLanding && <Footer isMobile={isMobile} />
            }
        </Layout>
    </div>
}

// <div ref={element} className="root-container">
//         <div className="root-mainview">
//             <Progress  scroll={scrollPosition + '%'} />
//             <header className={!props.isLanding? isSticky ? "root-navbar-fixed": "root-navbar": null } style={props.isLanding ? {  backgroundColor: 'transparent' }: {  backgroundColor: '#000' }}>
//                 {
//                     !props.isLanding && <Navbar isMobile={isMobile} isAuth = {props.isAuth}/>
//                 }
//             </header>
//             <main  className="root-content">
//                 {
//                     // !props.isLanding && <Marketing />
//                     !props.isLanding && <Sidebar />
//                 }
//                 <Switch>
//                     <Route exact path="/" render={(props) => <Landing isMobile={isMobile} {...props} title="Landing" />} />
//                     <Route exact path="/home" render={(props) => <Home isMobile={isMobile} {...props} title="Store" />} />
//                     <Route exact path="/product/:id" render={(props) => <Product isMobile={isMobile} {...props} />} />
//                     <Route exact path="/tops" render={(props) => <Tops isMobile={isMobile} {...props} />} />
//                     <Route exact path="/jacket" render={(props) => <Jacket isMobile={isMobile} {...props} />} />
//                     <Route exact path="/shirts" render={(props) => <Shirts isMobile={isMobile} {...props} />} />
//                     <Route exact path="/tshirts" render={(props) => <TShirts isMobile={isMobile} {...props} />} />
//                     <Route exact path="/skirt" render={(props) => <Skirt isMobile={isMobile} {...props} />} />
//                     <Route exact path="/dress" render={(props) => <Dress isMobile={isMobile} {...props} />} />
//                     <Route exact path="/jean" render={(props) => <Jean isMobile={isMobile} {...props} />} />
//                     <Route exact path="/short" render={(props) => <Shorts isMobile={isMobile} {...props} />} />
//                     <Route exact path="/jumpsuit" render={(props) => <JumpSuit isMobile={isMobile} {...props} />} />
//                     <Route exact path="/category" render={(props) => <Category isMobile={isMobile} {...props} />} />
//                     <Route exact path="/accessories" render={(props) => <Accessories isMobile={isMobile} {...props} />} />
//                     <Route exact path="/login" render={(props) => <Login isMobile={isMobile} {...props} />} />
//                     <Route exact path="/register" render={(props) => <Register isMobile={isMobile} {...props} />} />
//                     <Route exact path="/admin" render={(props) => <Admin  isMobile={isMobile} {...props} />} />
//                     <Route exact path="/cart" render={(props) => <Cart isMobile={isMobile} {...props} />} />
//                 </Switch>
//             </main>

//             {
//                 !props.isLanding && <Footer isMobile={isMobile} />
//             }
//         </div>
//     </div>

// <footer>
// {
//     !props.isLanding && <Contact isMobile={isMobile} cover="https://i.imgur.com/Wj6dytl.jpg" />
// }
// </footer>
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