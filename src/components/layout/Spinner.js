import React from 'react';

const Spinner = ({ size, button, color }) => {
    let style = {
        height: String(size * 15) + 'px',
        width: String(size * 15) + 'px'
    };
    if (button) {
        style['marginRight'] = '0.5rem';
        style['marginBottom'] = '-0.2rem';
    }
    if (color) {
        style['borderTopColor'] = `${color}`;
    }
    return <span className='spinner' style={style}></span>;
};

export default Spinner;
