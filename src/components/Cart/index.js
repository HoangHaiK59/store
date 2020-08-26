import React from 'react';
import './cart.css';
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="cart-container">
                <div className="nm-row">
                    <div className="row" style={{padding: '0 60px'}}>
                        <div className="col-md-12">
                            <h5>Cart work</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;