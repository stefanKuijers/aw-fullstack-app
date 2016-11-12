// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ServeActions from '../actions/server';

{
	let element = document.getElementById('app-container');
	element.className = 'app-loaded';
}

function mapStateToProps(state) {
  return {
  	serving: state.server.running
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
