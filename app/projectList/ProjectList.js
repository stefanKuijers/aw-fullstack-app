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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './ProjectList.css';
import Project from './Project.js';

const fileSystem = require('fs'); 
const Path = require('path'); 
const dialog = remote.dialog;
const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}



export default class ProjectList extends Component {
	state = {
		createProjectModal: false,
		addExistingProjectModal: false,
		path: undefined
	};

	toggleModalBoxState = (modalName = null, path) => {
		if (modalName === null) {
			this.state = {
				createProjectModal: false,
				addExistingProjectModal: false
			};
		} else {
			this.state[modalName] = !this.state[modalName];
		}
		this.state.path = path;

		this.setState(this.state);
	};

	createListItems(actions) {
		if (this.props.projects && this.props.projects.length) {
			return this.props.projects.map((project, index) => {
				let name = this.props.configs[project.configId] ?
					this.props.configs[project.configId].name
					: '';
				return (<Project key={index} data={{project, name}} actions={actions}/>);
			});
		} else {
			return (<div className={styles.noProjectsMessage}><p>Add your first project by clicking on the button below</p></div>);
		}
	}

	promptForFolder(action, actions) {
		dialog.showOpenDialog({
		    properties: ['openDirectory']
		}, (paths) => {
		  	if (paths && paths.length) {
		  		let path = paths[0] + Path.sep; 
		  		fileSystem.exists(
		  			`${path}.workflowconfig`, 
		  			(exists) => {this.handleProjectCreation(action, actions, exists, path)}); 
		  	}
		});
	}

	handleProjectCreation(action, actions, workflowconfigExists, path) {
		if (action === 'createNew' && workflowconfigExists) {
			this.toggleModalBoxState('addExistingProjectModal', path);
		} 

		// we want to create a new project and add its config. Lets do it.
		if (action === 'createNew' && !workflowconfigExists) {
			actions.createProject(path);
		} 

		// we want to add an existing project and there is a file to import. lets do it
		if (action === 'addExistingProject' && workflowconfigExists) {
			actions.addExistingProject(path);
		} 

		// we want to import a project but there is not file to import. 
		if (action === 'addExistingProject' && !workflowconfigExists) {
			this.toggleModalBoxState('createProjectModal', path);
		} 
	}

	render() {
		removeLoader();

		const actions = { 
			toggleProject: this.props.toggleProject,
			startBuild: this.props.startBuild,
			deleteProject: this.props.deleteProject,
			createProject: this.props.createProject,
			addExistingProject: this.props.addExistingProject
		};
		const modalCancelButton = <FlatButton label="Cancel" onTouchTap={() => {this.toggleModalBoxState()}} />;
		const createProjectModalButton = <FlatButton label="Create new project" primary={true} onTouchTap={() => {actions.createProject(this.state.path); this.toggleModalBoxState()}}/>;
		const addExistingProjectModalButton = <FlatButton label="Add existing project" primary={true} onTouchTap={() => {actions.addExistingProject(this.state.path); this.toggleModalBoxState()}}/>;

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
						<MenuItem primaryText="Create New" onTouchTap={() => {this.promptForFolder('createNew', actions)}} />
						<MenuItem primaryText="Add Existing Project" onTouchTap={() => {this.promptForFolder('addExistingProject', actions)}} />
						<MenuItem primaryText="Create From Template" />
					</IconMenu>

			    </List>

			    <Dialog
		          title="Add Existing Project"
		          actions={[modalCancelButton, addExistingProjectModalButton]}
		          modal={false}
		          open={this.state.addExistingProjectModal}
		        >
		          The folder you selected already contains a .workflowconfg file. Do you want to add this existing project to your project list?
		        </Dialog>

		        <Dialog
		          title="Create New Project"
		          actions={[modalCancelButton, createProjectModalButton]}
		          modal={false}
		          open={this.state.createProjectModal}
		        >
		          The folder you selected does not contain a .workflowconfg file. Do you want to create a new workflow project in this folder?
		        </Dialog>
		    </article>
		);
	}
}
