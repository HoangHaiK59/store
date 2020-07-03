import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => this.setState({ search: event.target.value });

    handleSearch = () => {
        firebase.firestore().collection('products').
    }

    render() {
        return <div>
            <input onChange={this.handleChange} type="text" value={this.state.search} />
        </div>
    }
}

export default Search;