import React from 'react';
import PropTypes from 'prop-types';

export const useTitle = ({title}) => {
    React.useEffect(() => {
        document.title = title;
    },[title])
}

useTitle.propTypes = {
    title: PropTypes.string.isRequired
}

useTitle.defaultProps = {
    title: 'React App'
}