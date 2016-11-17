// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectList from '../components/ProjectList/ProjectList';
import * as ProjectActions from '../actions/projects';
import * as ConfigActions from '../actions/config';

(function ProjectListInit() {
	let element = document.getElementById('app-container');
	element.className = 'app-loaded';
})();


function mapStateToProps(state) {
  return {
  	serving: state.server.running,
  	projects: state.projects,
  	config: state.config
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ ...ProjectActions, ...ConfigActions}, 
		dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
