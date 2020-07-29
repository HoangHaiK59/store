import React from 'react';
import './landing.css';
import { useHistory } from 'react-router-dom';
import { useTitle } from '../../helper/feature';
import { connect } from 'react-redux';
import { Constants } from '../../store/constants';
import { instance } from '../../utils/axios';

// <div className="circle-item"></div>
// <div className="ellip-item">
// </div>
// <img className="image-landing" src="https://i.imgur.com/LWdcr6f.jpg" alt="" />

const Landing = (props) => {
        const history = useHistory();
        useTitle({ title: props.title });
        const [ landing, setLanding ] = React.useState(null);
        React.useEffect(() => {
                instance.get(`GetLandingPage?ordinal=${1}`)
                .then(res => {
                        if(res.data.success) {
                                const { data } = res.data;
                                setLanding(data)
                        }
                })
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
