// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const theme = getMuiTheme();

const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Start</MenuItem>
    <MenuItem>Options</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

export default class Home extends Component {

	createListItems() {
		return this.props.projects.map((project) => {
			return (<ListItem
				key={project.id}
				leftAvatar={<Avatar icon={<FileFolder />} />}
				rightIcon={<ActionInfo />}
				rightIconButton={rightIconMenu}
				primaryText={project.name}
				secondaryText={project.state}
			/>);
		});
	}

	render() {
		const {toggleServer, serving, projects} = this.props;
		return (
		    <article className="page">
		        <header>
		          
		        </header>
		        <section>
		        	<List>
				        <Subheader inset={false}>Projects</Subheader>

				        {this.createListItems()}

				        <ListItem
							leftAvatar={<Avatar icon={<AddIcon/>} />}
							primaryText="Add new project"
						/>
				    </List>
		        </section>
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