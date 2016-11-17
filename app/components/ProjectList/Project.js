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
import { Link } from 'react-router';

const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon/>
  </IconButton>
);

const linkStyle = {
	color: 'white',
    textDecoration: 'none',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '48px',
    left: '0',
    padding: '0 15px'
};

export default class Project extends Component {
	render() {
		return (
			<ListItem
				leftAvatar={<Avatar icon={<FileFolder />} />}
				rightIconButton={
					<IconMenu iconButtonElement={iconButtonElement}>
					    <MenuItem>Start</MenuItem>
					    <MenuItem><Link to={`/config/${this.props.data.configId}`} style={linkStyle}>Options</Link></MenuItem>
					    <Divider />
					    <MenuItem>Delete</MenuItem>
					</IconMenu>
				}
				primaryText={this.props.data.name}
				secondaryText={this.props.data.state}
			/>
		);
	}
}
