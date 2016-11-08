import React, { PropTypes } from 'react';

const Oshape = () => (
    <svg className={'shape o'} role="img" viewBox="0 0 128 128">
        <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"/>
    </svg>
);

const Xshape = () => (
    <svg className={'shape x'} role="img" viewBox="0 0 128 128">
        <path d="M16,16L112,112"/>
        <path d="M112,16L16,112"/>
    </svg>
);

const Shape = props => (
    <span>
        {(props.type === 1) ? <Xshape/> : <Oshape/>}
    </span>
);

Shape.propTypes = {
    type: PropTypes.number
};

export default Shape;
