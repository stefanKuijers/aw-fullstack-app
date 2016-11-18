// @flow
import React, { Component } from 'react';
import styles from './ProjectList.css';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Project from './Project.js';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';

const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}


export default class ProjectList extends Component {
	componentWillMount() {
  		this.props.fetchProjects();
	};

	createListItems() {
		return this.props.projects.map((project) => {
			return (<Project key={project.id} data={project}/>);
		});
	}

	render() {
		removeLoader();
		return (
		    <article className="page">
	        	<List>
			        <Subheader>Projects</Subheader>

			        {this.createListItems()}

			        <ListItem
						leftAvatar={<Avatar icon={<AddIcon/>} />}
						primaryText="Add new project"
					/>
			    </List>
		    </article>
		);
	}
}
