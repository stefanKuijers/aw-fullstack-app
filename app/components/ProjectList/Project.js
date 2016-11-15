// @flow
import React, { Component } from 'react';
import styles from './Project.css';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Start</MenuItem>
    <MenuItem>Options</MenuItem>
    <Divider />
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

export default class Project extends Component {
	render() {
		return (
			<ListItem
				leftAvatar={<Avatar icon={<FileFolder />} />}
				rightIconButton={rightIconMenu}
				primaryText={this.props.data.name}
				secondaryText={this.props.data.state}
			/>
		);
	}
}
