import React, { PropTypes } from 'react';
import { List } from 'immutable';
import Shape from './Shapes';

require('../../../styles/components/TicTacBoard.scss');

const TicTacBoard = props => (
    <div id="TicTacBoard">
        <svg id="boardLines">
            <path d="M108,83L6,83"/>
            <path d="M108,83L210,83"/>
            <path d="M73,118L73,16"/>
            <path d="M73,118L73,220"/>
            <path d="M108,153L6,153"/>
            <path d="M108,153L210,153"/>
            <path d="M143,118L143,16"/>
            <path d="M143,118L143,220"/>
        </svg>
        <table>
            <tbody>{
                props.board.map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                            <td key={`${i}-${j}`} onClick={() => !col && props.drawAt([i, j])}>
                                { (col === 0) ? null : <Shape type={col}/> }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

TicTacBoard.propTypes = {
    board: PropTypes.instanceOf(List)
};

export default TicTacBoard;
