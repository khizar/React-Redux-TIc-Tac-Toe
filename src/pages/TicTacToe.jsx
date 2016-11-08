import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../actions/coreActions';
import ScoreListContainer from '../components/TicTacToe/ScoreList/ScoreListContainer';
import TicTacBoardContainer from '../components/TicTacToe/TicTacToeBoard/TicTacBoardContainer';
import StatusBarContainer from '../components/TicTacToe/StatusBar/StatusBarContainer';
import ButtonContainer from '../components/TicTacToe/Button/ButtonContainer';

class TicTacToe extends React.Component {
    static propTypes = {
        initialiseGame: React.PropTypes.func
    };

    componentWillMount() {
        this.props.initialiseGame();
    }

    render() {
        return (
            <div className={'main-inner'}>
                <div className={'row1'}>
                    <h3>Tic Tac Toe!</h3>
                    <ScoreListContainer/>
                    <StatusBarContainer/>
                </div>
                <div className={'row2'}>
                    <TicTacBoardContainer/>
                </div>
                <ButtonContainer/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    initialiseGame: () => {
        dispatch(setState());
    }
});

export default connect(null, mapDispatchToProps)(TicTacToe);
