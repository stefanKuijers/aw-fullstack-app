// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectList from '../components/ProjectList/ProjectList';
import * as ServeActions from '../actions/server';

function mapStateToProps(state) {
  return {
  	serving: state.server.running,
  	projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);


// First page is ready to be loaded to we add the loaded class to the app
{
	let element = document.getElementById('app-container');
	element.className = 'app-loaded';
}
