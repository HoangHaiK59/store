import React from 'react';
import './accessories.css'
import { NAV_BAR_HEIGHT } from '../../helper/calc';

export default class Accessories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className='accessories-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
            <h5 style={{ color: '#fff' }}>Accessories work</h5>
        </div>
    }
}