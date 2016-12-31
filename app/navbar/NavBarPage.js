// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import * as OnlineProjectsActions from '../onlineProjects/onlineProjects.actions';
import * as NavbarActions from './navbar.actions';


function mapStateToProps(state) {
  return {
  	projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ 
			...OnlineProjectsActions,
			...NavbarActions
		}, 
		dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
