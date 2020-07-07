import React from 'react';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import './women.css';
class Women extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return <div className='women-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
            <h5 style={{ color: '#fff' }}>Women work</h5>
        </div>
    }
}

export default Women;