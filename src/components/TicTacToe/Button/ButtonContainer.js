import { connect } from 'react-redux';
import Button from './Button';
import { restartGame } from '../../../actions/coreActions';

const mapDispatchToProps = dispatch => ({
    restart: () => {
        dispatch(restartGame());
    }
});

const ButtonContainer = connect(null, mapDispatchToProps)(Button);

export default ButtonContainer;
