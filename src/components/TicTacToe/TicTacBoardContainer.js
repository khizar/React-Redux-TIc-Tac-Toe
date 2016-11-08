import { connect } from 'react-redux';
import TicTacBoard from './TicTacBoard';
import { writeAtCell, nextTurn } from '../../actions/coreActions';

const mapStateToProps = state => ({
    board: state.getIn(['core', 'board'])
});


const mapDispatchToProps = dispatch => ({
    drawAt: (cell) => {
        dispatch(writeAtCell(cell));
        dispatch(nextTurn());
    }
});

const TicTacBoardContainer = connect(mapStateToProps, mapDispatchToProps)(TicTacBoard);

export default TicTacBoardContainer;
