// @flow
import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';

import styles from './ProjectList.css';
import Project from './Project.js';

const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}


export default class ProjectList extends Component {
	componentWillMount() {
  		// this.props.fetchProjects();
	};

	createListItems() {
		if (this.props.projects) {
			return this.props.projects.map((project, index) => {
				return (<Project key={index} data={project}/>);
			});
		}
	}

	render() {
		removeLoader();
		return (
		    <article className="page">
	        	<List>
			        <Subheader>Projects</Subheader>

			        {this.createListItems()}

			        <ListItem
			        	key="addNew"
						leftAvatar={<Avatar icon={<AddIcon/>} />}
						primaryText="Add new project"
					/>
			    </List>
		    </article>
		);
	}
}
