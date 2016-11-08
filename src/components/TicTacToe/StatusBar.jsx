import React, { PropTypes } from 'react';
import Shape from './Shapes';

require('../../../styles/components/StatusBar.scss');

const StatusBar = props => (
    <div className={'status'}>
        {
            (props.turn !== 0)
                ? <span><Shape type={props.turn}/>Turn</span>
                : <span>Game Over</span>
        }
    </div>
);

StatusBar.propTypes = {
    turn: PropTypes.number
};

export default StatusBar;
