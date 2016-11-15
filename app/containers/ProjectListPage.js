// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectList from '../components/ProjectList/ProjectList';
import * as ProjectActions from '../actions/projects';

(function ProjectListInit() {
	let element = document.getElementById('app-container');
	element.className = 'app-loaded';
})();


function mapStateToProps(state) {
  return {
  	serving: state.server.running,
  	projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
