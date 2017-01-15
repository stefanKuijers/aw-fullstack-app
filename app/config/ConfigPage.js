// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from './Config';
import * as ConfigActions from './config.actions';

function mapStateToProps(state) {
  return {
    configs: state.configs,
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConfigActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
