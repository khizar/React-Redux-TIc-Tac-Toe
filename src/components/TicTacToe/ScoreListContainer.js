import { connect } from 'react-redux';
import ScoreList from './ScoreList';

const mapStateToProps = state => ({
    players: state.getIn(['core', 'players']),
    turn: state.getIn(['core', 'turn'])
});

const ScoreListContainer = connect(mapStateToProps)(ScoreList);

export default ScoreListContainer;
