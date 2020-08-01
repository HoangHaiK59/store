import React from 'react';
import { Button } from 'antd';

export default class BtnCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }

    btnClickedHandler(id) {
        if (this.props.buttons[id].clicked) {
            const params = {
                rowData: this.props.data,
                index: this.props.rowIndex
            }
            this.props.buttons[id].clicked(params);
        }
    }
    render() {
        return (
            <div style={{ width: '100px' }}>
                {
                    this.props.buttons.map((button, id) => <Button 
                    key={id} 
                    type={button.type} 
                    onClick={() => this.btnClickedHandler(id)}
                    icon={button.icon}
                    >
                        {button.label}
                    </Button>)
                }
            </div>
        )
    }
}