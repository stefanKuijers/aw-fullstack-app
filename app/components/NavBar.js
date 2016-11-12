// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};



export default class NavBar extends Component {
  render() {
    return (
      <AppBar
	    title={<span style={styles.title}>Arteries Workflow</span>}
	    onTitleTouchTap={handleTouchTap}
	    iconElementRight={<IconButton><NavigationClose /></IconButton>}
	  />
    );
  }
}
