// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectList from './ProjectList';
import * as ProjectActions from './project.actions';
import * as ConfigActions from '../config/config.actions';


function mapStateToProps(state) {
  return {
  	projects: state.projects,
  	config: state.config
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ 
			...ProjectActions, 
			...ConfigActions
		}, 
		dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
