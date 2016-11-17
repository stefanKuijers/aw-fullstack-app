// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Options from '../components/Options';
import * as OptionsActions from '../actions/options';

function mapStateToProps(state) {
  return {
    options: state.options
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(OptionsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
