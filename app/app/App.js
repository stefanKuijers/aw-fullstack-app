// @flow
import {
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavBarPage from '../navbar/NavBarPage';
import { logAction } from './stateStorage';
import { remote } from 'electron';

const APP = {
	name: 'ArtFlow',
	version: '0.11.1'
};

process.on('uncaughtException', (error) => {
    logAction({
    	type: 'APPLICATION_ERROR',
    	payload: error.message
    }, true);

    document.getElementById('app-error-message').innerHTML = error;
    document.getElementById('app-error-title').innerHTML = `${APP.name} (${APP.version}) | has encountered an error`;
    document.getElementById('toggle-error').click();

	if (process.env.NODE_ENV === 'development') throw error;
});


injectTapEventPlugin();

const appTheme = getMuiTheme({
	fontFamily: '\'Montserrat\', sans-serif',
	palette: {
		primary1Color: '#fac415',
		primary2Color: '#e0a826',
		primary3Color: grey400,
		// accent1Color: pinkA200,
		accent2Color: grey100,
		accent3Color: grey500,
		textColor: white,
		alternateTextColor: '#3b3a3a',
		canvasColor: '#3b3a3a',
		borderColor: grey300,
		disabledColor: fade('#3b3a3a', 0.3),
		pickerHeaderColor: '#3b3a3a',
		clockCircleColor: fade('#3b3a3a', 0.07),
		shadowColor: fullBlack
	}
});

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={appTheme}>
      	<section>
      		<header className="app-navbar">
	      		<NavBarPage></NavBarPage>
      		</header>

	        <section className="app-content">{this.props.children}</section>
      	</section>
      </MuiThemeProvider>
    );
  }
}
