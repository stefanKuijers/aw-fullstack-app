// @flow
import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import styles from './ProjectList.css';
import Project from './Project.js';

const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}


export default class ProjectList extends Component {
	createListItems(actions) {
		if (this.props.projects) {
			return this.props.projects.map((project, index) => {
				return (<Project key={index} data={project} actions={actions}/>);
			});
		}
	}

	render() {
		removeLoader();
		const actions = { 
			toggleProject: this.props.toggleProject,
			startBuild: this.props.startBuild,
			deleteProject: this.props.deleteProject
		};
		return (
		    <article className="page">
	        	<List>
			        <Subheader>Projects</Subheader>

			        {this.createListItems(actions)}

			        <IconMenu
			        	className={styles.iconMenu}
						anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
						targetOrigin={{horizontal: 'middle', vertical: 'top'}}
			        	iconButtonElement={
							<IconButton className={styles.buttonListItem}>
								<ListItem
						        	key="addNew"
									leftAvatar={<Avatar icon={<AddIcon/>} />}
									primaryText="Add new project"
									className={styles.listItem}
								/>
							</IconButton>
						}
					>
						<MenuItem primaryText="New Configuration" onTouchTap={this.props.addProject} />
						<MenuItem primaryText="Import From Server" />
						<MenuItem primaryText="Import From File" />
					</IconMenu>

			    </List>
		    </article>
		);
	}
}
