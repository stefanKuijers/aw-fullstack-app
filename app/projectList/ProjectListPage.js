// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectList from './ProjectList';
import * as ProjectActions from './project.actions';
import * as ConfigActions from '../config/config.actions';
import * as WorkflowActions from '../workflow/workflow.actions';


function mapStateToProps(state) {
  return {
  	projects: state.projects,
  	configs: state.configs
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ 
			...ProjectActions, 
			...ConfigActions,
			...WorkflowActions
		}, 
		dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
