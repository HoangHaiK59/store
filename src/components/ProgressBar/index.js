import React from 'react';

const Progress = ({scroll}) => {
    return (
        <div style={{
            position: 'fixed',
            background: `rgba(245, 144, 66, .8)`,
            width: `${scroll}`,
            height: '4px',
            zIndex: 200,
        }}>
        </div>
    )
}
export default Progress;