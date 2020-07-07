import React from 'react';
import './collection.css';
import { NAV_BAR_HEIGHT } from '../../helper/calc';

export default class Winter extends React.Component {
    render() {
        return(
            <div className='collection-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
                <h5 style={{ color: '#fff' }}>Winter work</h5>
            </div>
        )
    }
}