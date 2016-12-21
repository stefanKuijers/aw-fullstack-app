// @flow
import React, { Component } from 'react';
import { shell } from 'electron';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

import styles from './OnlineProjects.css';

const checkProjectsIntervalDelay = 10000;
let checkProjectsInterval;


export default class OnlineProjects extends Component {
	componentWillMount() {
		checkProjectsInterval = setInterval(() => {
			this.props.getOnlineProjects();
		}, checkProjectsIntervalDelay);
	}

	componentWillUnmount() {
		clearInterval(checkProjectsInterval);
	}

	renderNoProjectsMessage() {
		return(
			<section className={styles.noProjectsMessage}>
				<p>Projects will appear when other users start working on their projects</p>
			</section>
		);
	}

	renderOnlineProjects() {
		return this.props.onlineProjects.map((project, index) => {
			return(
				<ListItem
					key={index}
					onTouchTap={(e) => {shell.openExternal(project.url)}}
					leftAvatar={<Avatar icon={<FileFolder />} />}
					primaryText={project.name}
					secondaryText={project.author}
					className={styles.listItem}
				/>
			);
		});
	}

	render() {
		return (
			<Card className="section">
				<CardTitle title={"Online Projects"}/>
				<CardText>
					<List>							
						{(this.props.onlineProjects.length) ? 
							this.renderOnlineProjects() : 
							this.renderNoProjectsMessage()
						}
					</List>
				</CardText>
			</Card>
		);
	}
}
