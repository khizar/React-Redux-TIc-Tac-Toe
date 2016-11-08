import { connect } from 'react-redux';
import StatusBar from './StatusBar';

const mapStateToProps = state => ({
    turnText: state.getIn(['core', 'turn']) ? 'Turn' : 'Game Over',
    turn: state.getIn(['core', 'turn'])
});

const StatusBarContainer = connect(mapStateToProps)(StatusBar);

export default StatusBarContainer;
