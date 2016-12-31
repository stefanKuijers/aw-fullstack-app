// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { remote } from 'electron';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


import styles from './Config.css';
import Feature from './feature/Feature';

// only in debug
const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}

const dialog = remote.dialog;

class Config extends Component {
  	componentWillMount() {
  		this.props.fetchConfig(this.props.params.configId);
	};

	openDirectorySelect(prop, updateCallback) {
		dialog.showOpenDialog({
		    properties: ['openDirectory']
		}, (paths) => {
		  	if (paths.length) {
			  	updateCallback(prop, undefined, paths[0]+'\\')
		  	}
		});
	}

	render() {
		if (this.props.configs[this.props.configs.currentConfigId]) {
			removeLoader(); // just in debug
			const actions = { 
				updateProperty: this.props.updateProperty, 
				addGlob: this.props.addGlob,
				removeGlob: this.props.removeGlob,
				moveGlob: this.props.moveGlob 
			};
			let configId = this.props.configs.currentConfigId;
			let {watch, sass, javascript, dependencyManagement} = this.props.configs[configId];
			let config = this.props.configs[configId];

			return (
				<section className="page">
					<article>
						{/* This card show be its own component: General */}
						<Card className="section">
							<CardTitle 
								title={config.name} 
								subtitle={config.server.type}
							/>
							<CardText>
								<List>
								    <ListItem key="projectName" className={styles.listItem}>
										<TextField 
											onChange={(e, val) => {actions.updateProperty('name', undefined, val)}}
											value={config.name}
											style={{width: '100%'}}
											hintText="Project Name"
											hintStyle={{color: 'rgba(180,180,180,0.5)'}}
										/>
								    </ListItem>

								    <ListItem key="path" className={styles.listItem}>
										<TextField 
											onTouchTap={() => {this.openDirectorySelect('path', actions.updateProperty)}}
											onChange={(e, val) => {actions.updateProperty('path', undefined, val)}}
											value={config.path}
											readOnly
											style={{width: '100%'}}
											hintText="Absolute Path to Project Folder"
											hintStyle={{color: 'rgba(180,180,180,0.5)'}}
										/>
								    </ListItem>
								</List>
							</CardText>
							<CardText>

								<RadioButtonGroup
									className={styles.radioGroup}
									name="serverType" 
									valueSelected={config.server.type}
									onChange={(e, val) => {this.props.updateProperty('server', 'type', val)}}
								>
							      <RadioButton
							        value="express"
							        label="Express"
							        className={styles.radioButton}
							      />
							      <RadioButton
							        value="proxy"
							        label="Proxy existing server"
							        className={styles.radioButton}
							      />
							    </RadioButtonGroup>

							    <List>
								    <ListItem key="serverTarget" className={styles.listItem}>
										<TextField 
											onChange={(e, val) => {actions.updateProperty('server', 'target',  val)}}
											value={config.server.target}
											style={{width: '100%'}}
											hintText={config.server.type === "express" ? "Root folder to start server in" : "URL of server"}
											hintStyle={{color: 'rgba(180,180,180,0.5)'}}
										/>
								    </ListItem>
								</List>
							    
							</CardText>
						</Card>

						<Feature data={{
								configId,
								options: watch,
								key: 'watch',
								title: 'File Watcher',
							}}
							actions={actions}
						/>

						<Feature data={{
								configId,
								rootFolder: config.path,
								options: sass,
								key: 'sass',
								title: 'CSS Preprocessor',
							}}
							actions={actions}
						/>

						<Feature data={{
								configId,
								rootFolder: config.path,
								options: javascript,
								key: 'javascript',
								title: 'JS Processing and ES6+',
							}}
							actions={actions}
						/>

						<Feature data={{
								configId,
								options: dependencyManagement,
								key: 'dependencyManagement',
								title: 'Dependency Management',
							}}
							actions={actions}
						/>

					</article>
					<footer>
						<Link to={'/projects'} className={styles.link}>
							<FlatButton 
								label="Back"
								icon={<NavigationArrowBack />}
							/>
						</Link>
					</footer>
				</section>
			);
		} else {
			return (
				<section className="page">
						<header>
							Loading config:{this.props.configs.currentConfigId}
						</header>
						<footer>
							<Link to={'/projects'} className={styles.link}>
								<FlatButton 
									label="Back"
									icon={<NavigationArrowBack />}
								/>
							</Link>
					</footer>
				</section>
			);
		}

	}
}

export default Config;
