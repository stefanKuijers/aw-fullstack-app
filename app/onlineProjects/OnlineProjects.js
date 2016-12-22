// @flow
import React, { Component } from 'react';
import { remote, shell } from 'electron';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionLanguage from 'material-ui/svg-icons/action/language';

import styles from './OnlineProjects.css';
import OnlineProjectServer from './OnlineProjectServer';

const checkProjectsIntervalDelay = 5000;
let checkProjectsInterval;
let onlineProjectServer;

const jsonfile = require('jsonfile');


export default class OnlineProjects extends Component {
	componentWillMount() {
		checkProjectsInterval = setInterval(() => {
			// this.props.getOnlineProjects();
		}, checkProjectsIntervalDelay);

		this.onlineProjectServer = new OnlineProjectServer();

		this.setState({
			starting: -1,
			running: -1
		});

	}

	componentWillUnmount() {
		clearInterval(checkProjectsInterval);
		this.onlineProjectServer.stop();
	}

	getProjectClassName(id) {
		return (
			((this.state.starting === id) ? 'starting' : '') +
			((this.state.running === id) ? 'running' : '') +
			((this.state.running != id && this.state.starting != id ) ? 'idle' : '')
		);
	}

	renderNoProjectsMessage() {
		return(
			<section className={styles.noProjectsMessage}>
				<p>Projects will appear when other users start working on their projects</p>
			</section>
		);
	}

	visitProject(project) {
		if (this.state.starting === project.id) return;

		if (this.state.running === project.id) {
			this.onlineProjectServer.stop();
			this.setState({
				starting: -1,
				running: -1
			});
		} else {
			this.setState({
				starting: project.id,
				running: -1
			});

			this.onlineProjectServer.start(
				project.url || 'http://192.168.0.41:3001',
				() => {
					shell.openExternal(`http://localhost:8999/`);
					this.setState({
						starting: -1,
						running: project.id
					});
				}
			);
		}
	}

	renderOnlineProjects() {
		return this.props.onlineProjects.map((project, index) => {
			return(
				<div 
					key={index}
					className={styles[this.getProjectClassName(project.id)]}
				>
					<ListItem
						onTouchTap={(e) => {this.visitProject(project)}}
						leftAvatar={<Avatar icon={<ActionLanguage />} />}
						primaryText={`${project.name} - ${project.username}`}
						secondaryText={project.url}
						className={styles.listItem}
					/>
				</div>
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
