import React, { PropTypes } from 'react';

require('../../../styles/components/Button.scss');

const Button = props => (
    <button className={'row3'} onClick={props.restart}> Restart Game </button>
);

Button.propTypes = {
    restart: PropTypes.func
};

export default Button;

