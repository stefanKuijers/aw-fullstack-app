// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ServeActions from '../actions/serve';

function mapStateToProps(state) {
  return {
  	serving: state.serve
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
