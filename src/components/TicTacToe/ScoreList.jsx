import React, { PropTypes } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';
import Shape from './Shapes';

require('../../../styles/components/ScoreList.scss');

const ScoreList = props => (
    <div className={'score-wrapper'}>
        {props.players.map((player, index) => (
            <div key={index} className={classNames('score-pane', `p${index}`, { active: props.turn === index + 1 })}>
                <div className={'score-pane-inner'}>
                    <Shape type={index + 1}/>
                    <span>{player.get('score')}</span>
                </div>
            </div>
        ))}
    </div>
);

ScoreList.propTypes = {
    players: PropTypes.instanceOf(List),
    turn: PropTypes.number
};

export default ScoreList;

