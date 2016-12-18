// @flow
import React, { Component } from 'react';
import { remote } from 'electron';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import styles from './ProjectList.css';
import Project from './Project.js';

const fileSystem = require('fs'); 
console.log('PATH', fileSystem);
const dialog = remote.dialog;
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

	addExistingProject() {
		dialog.showOpenDialog({
		    properties: ['openDirectory']
		}, (paths) => {
		  	if (paths.length) {
		  		console.log(`${paths[0]}/bower.json`);
		  		fileSystem.exists(`${paths[0]}/bower.json`, function(exists) { 
		  			console.log(exists)
				    if(exists) {
        				console.log('File exists');
				    } else {
				        console.log('NO FILE');
				    }
				}); 
		  	}
		});
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
						<MenuItem primaryText="Create New" onTouchTap={this.props.addProject} />
						<MenuItem primaryText="Add Existing Project" onTouchTap={() => {this.addExistingProject()}} />
						<MenuItem primaryText="Create From Template" />
					</IconMenu>

			    </List>
		    </article>
		);
	}
}
