// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OnlineProjects from './OnlineProjects';
import * as OnlineProjectsActions from './onlineProjects.actions';


function mapStateToProps(state) {
  return {
  	onlineProjects: state.onlineProjects
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

export default connect(mapStateToProps, mapDispatchToProps)(OnlineProjects);
