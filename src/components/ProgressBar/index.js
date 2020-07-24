import React from 'react';

const Progress = ({scroll}) => {
    return (
        <div style={{
            position: 'fixed',
            background: `#685780`,
            width: `${scroll}`,
            height: '4px',
            zIndex: 200,
        }}>
        </div>
    )
}
export default Progress;