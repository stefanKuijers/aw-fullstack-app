// @flow
import React, { Component } from 'react';
import { shell } from 'electron';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionLanguage from 'material-ui/svg-icons/action/language';

import styles from './OnlineProjects.css';
import OnlineProjectServer from './OnlineProjectServer';

const checkProjectsIntervalDelay = 10000;
let checkProjectsInterval;
let onlineProjectServer;


export default class OnlineProjects extends Component {
	componentWillMount() {
		checkProjectsInterval = setInterval(() => {
			this.props.getOnlineProjects();
		}, checkProjectsIntervalDelay);

		onlineProjectServer = new OnlineProjectServer();
		this.visitProject('AW Fullstack', 'www.stefankuijers.nl');
	}

	componentWillUnmount() {
		clearInterval(checkProjectsInterval);
		onlineProjectServer.stop();
	}

	renderNoProjectsMessage() {
		return(
			<section className={styles.noProjectsMessage}>
				<p>Projects will appear when other users start working on their projects</p>
			</section>
		);
	}

	visitProject(name, url) {
		const slug = onlineProjectServer.convertToSlug(name);
		onlineProjectServer.registerNewProject(slug, url);
		shell.openExternal(`http://localhost:8999/${slug}`);
	}

	renderOnlineProjects() {
		return this.props.onlineProjects.map((project, index) => {
			return(
				<ListItem
					key={index}
					onTouchTap={(e) => {this.visitProjectshell(project.name, project.url)}}
					leftAvatar={<Avatar icon={<ActionLanguage />} />}
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
