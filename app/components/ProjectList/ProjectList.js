// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router';
import styles from './ProjectList.css';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Project from './Project.js';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';


export default class ProjectList extends Component {

	createListItems() {
		return this.props.projects.map((project) => {
			return (<Project key={project.id} data={project}/>);
		});
	}

	render() {
		const {toggleServer, serving, projects} = this.props;
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

/*
<footer>
  <RaisedButton 
  	onClick={toggleServer} 
  	primary={true}
  	label={serving ? 'stop server' : 'start server'}
  />
</footer>
*/