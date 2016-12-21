// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Welcome from './Welcome';
import * as WelcomeActions from './welcome.actions';


function mapStateToProps(state) {
  return {
  	profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ 
			...WelcomeActions
		}, 
		dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
