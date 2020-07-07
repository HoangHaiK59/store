import React from 'react';
import './collection.css';
import { NAV_BAR_HEIGHT } from '../../helper/calc';

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className='collection-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
            <h5 style={{ color: '#fff' }}> Collection work </h5>
        </div>
    }
}