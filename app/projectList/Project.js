// @flow
import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

import styles from './Project.css';

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
	stateToggleLabel(project) {
		return project.running ? "Stop" : "Start"
	}

	render() {
		const project = this.props.data;

		return (
			<ListItem
				leftAvatar={<Avatar icon={<FileFolder />} />}
				rightIconButton={
					<IconMenu 
						iconButtonElement={iconButtonElement}
						anchorOrigin={{horizontal: 'right', vertical: 'top'}}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
					>
					    <MenuItem onTouchTap={() => {this.props.actions.toggleProject(project)}}>{this.stateToggleLabel(project)}</MenuItem>
					    <MenuItem onTouchTap={() => {this.props.actions.startBuild(project.id)}}>Build</MenuItem>
					    <MenuItem disabled={project.running}>
					    	<Link 
					    		to={`/config/${project.configId}`} 
					    		style={linkStyle}
					    		className={styles.link}
					    		disabled={project.running}
					    	>Options</Link>
					    </MenuItem>
					    <Divider />
					    <MenuItem onTouchTap={() => {this.props.actions.deleteProject(project)}}>Delete</MenuItem>
					</IconMenu>
				}
				primaryText={project.name}
				secondaryText={project.state}
				className={styles.listItem}
			/>
		);
	}
}
