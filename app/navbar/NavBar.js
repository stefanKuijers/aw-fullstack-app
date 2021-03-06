// @flow
import {remote} from 'electron';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import MinimizeIcon from 'material-ui/svg-icons/content/remove';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import styles from './NavBar.css';

const appWindow = remote.getCurrentWindow();

export default class NavBar extends Component {
  componentWillMount() {
  	browserHistory.listen((location) =>  {
	 this.state.onConfigPage = (location.hash.indexOf('config') != -1);
	 this.setState(this.state);
	});

	// prevent initial close 
	window.onbeforeunload = () => {
	  	this.quit();

	    return false;
	};
  }

  state = {
  	onConfigPage: (location.hash.indexOf('config') != -1)
  }

  minimize() {
    appWindow.minimize(); 
  }

  quit() {
    // hacky solution to overwriting the initial onbeforeunload listener to make sure we don't prevent quit anymore
    window.onbeforeunload = () => {};

    let registredProjects = [];
    for (var i = this.props.projects.length - 1; i >= 0; i--) {
      if(this.props.projects[i].running) {
        registredProjects.push(this.props.projects[i].id);
      }
    }

    if (registredProjects.length) {
      this.props.unregisterOnlineProjects(
        registredProjects, 
        () => {
          appWindow.close();
        }
      );
    } else {
      appWindow.close();
    }
  }

  getTopLeftButton() {
  	return (this.state.onConfigPage ?
  		(<IconButton onTouchTap={this.props.backToProjects}><NavigationArrowBack /></IconButton>) :
  		null);
  }

  render() {
    return (
      <AppBar 
      	showMenuIconButton={this.state.onConfigPage}
      	iconElementLeft={this.getTopLeftButton()}
      	title={<div className={styles.titleBar}>{remote.app.getName()}</div>}
      >
	  	<section className={styles.btnGroup}>
		  	<IconButton onTouchTap={() => {this.minimize()}}><MinimizeIcon /></IconButton>
		  	<IconButton onTouchTap={() => {this.quit()}}><CloseIcon /></IconButton>
	  	</section>
	  </AppBar>
    );
  }
}
