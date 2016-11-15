// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import MinimizeIcon from 'material-ui/svg-icons/content/remove';
import {remote} from 'electron';
import styles from './NavBar.css';


function minimize() {
  var _window = remote.getCurrentWindow();
  _window.minimize(); 
}

function close() {
  var _window = remote.getCurrentWindow();
  _window.close();
}



export default class NavBar extends Component {
  render() {
    return (
      <AppBar title={<div className={styles.titleBar}>Workflow Fullstack</div>}>
	  	<section className={styles.btnGroup}>
		  	<IconButton onTouchTap={minimize}><MinimizeIcon /></IconButton>
		  	<IconButton onTouchTap={close}><CloseIcon /></IconButton>
	  	</section>
	  </AppBar>
    );
  }
}
