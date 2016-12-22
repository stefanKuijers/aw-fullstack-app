// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import * as OnlineProjectsActions from '../onlineProjects/onlineProjects.actions';


function mapStateToProps(state) {
	// console.log(state);
  return {
  	projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ 
			...OnlineProjectsActions
		}, 
		dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
