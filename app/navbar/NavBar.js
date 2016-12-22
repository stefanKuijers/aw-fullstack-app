// @flow
import {remote} from 'electron';
import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import MinimizeIcon from 'material-ui/svg-icons/content/remove';

import styles from './NavBar.css';

const appWindow = remote.getCurrentWindow();

export default class NavBar extends Component {
  minimize() {
    appWindow.minimize(); 
  }

  quit() {
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
          console.warn('I QUIT!!!', registredProjects.length);
          // remote.app.quit();
        }
      );
    } else {
      console.warn('I QUIT!!! 0');
      // remote.app.quit();
    }

  }

  render() {
    return (
      <AppBar showMenuIconButton={false} title={<div className={styles.titleBar}>Workflow Fullstack</div>}>
	  	<section className={styles.btnGroup}>
		  	<IconButton onTouchTap={() => {this.minimize()}}><MinimizeIcon /></IconButton>
		  	<IconButton onTouchTap={() => {this.quit()}}><CloseIcon /></IconButton>
	  	</section>
	  </AppBar>
    );
  }
}
