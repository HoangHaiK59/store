import React from 'react';
import './collection.css';
import { NAV_BAR_HEIGHT } from '../../helper/calc';

export default class Summer extends React.Component {
    render() {
        return(
            <div className='collection-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
                <h5 style={{ color: '#fff' }}>Summer work</h5>
            </div>
        )
    }
}