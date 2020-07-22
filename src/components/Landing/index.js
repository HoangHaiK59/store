import React from 'react';
import './landing.css';
import { useHistory } from 'react-router-dom';
import { useTitle } from '../../helper/feature';
import { connect } from 'react-redux';
import { Constants } from '../../store/constants';

// <div className="circle-item"></div>
// <div className="ellip-item">
// </div>
// <img className="image-landing" src="https://i.imgur.com/LWdcr6f.jpg" alt="" />

const Landing = (props) => {
        const history = useHistory();
        useTitle({ title: props.title });
        const [ landing, setLanding ] = React.useState(null);
        React.useEffect(() => {
                fetch(`https://localhost:5001/api/v1/GetLandingPage?ordinal=${1}`, {
                        method: 'GET',
                        headers: {
                                'content-type': 'application/json'
                        }
                })
                .then(response => response.status === 200 && response.json().then(result => {
                        setLanding(result.data);
                }))
                .catch(error => console.log(error))
        }, [])
        const { changeView } = props;
        React.useLayoutEffect(() => {
                changeView(true);
        }, [changeView])
        const handleClick = () => {
                props.changeView(false);
                history.push('/store');
        }
        return landing && <div className="landing-container">
                <img src={landing.url} alt="" style={{ objectFit: 'cover'}} className="imageBackdrop" />

                <button className="btn-shop-now" onClick={handleClick}>
                        SHOP NOW
                </button>
        </div>
}

const mapStateToProps = (state, ownProps) => {
        return {
        }
}

const mapDispatchToProps = (dispatch, ownProps) => {
        return {
                changeView: (isLanding) => {
                        dispatch({ type: Constants.CHANGE_VIEW, isLanding })
                }
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
