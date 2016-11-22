// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Config.css';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Feature from './Feature';

// only in debug
const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}

class Config extends Component {
  	componentWillMount() {
  		console.log('Config fetch', this.props.params.configId);
  		this.props.fetchConfig(this.props.params.configId);
	};

	render() {
		removeLoader(); // just in debug
		let {watch, sass, javascript, dependencyManagement} = this.props.configs[this.props.configs.currentConfigId];
		let config = this.props.configs[this.props.configs.currentConfigId];
		let actions = { 
			toggleFeature: this.props.toggleFeature,
			updateProperty: this.props.updateProperty 
		};
		return (
			<section className="page">
				<article>
					<Card className="section">
						<CardTitle 
							title={config.name + this.props.configs.currentConfigId + ' - ' + this.props.params.configId} 
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
										onChange={(e, val) => {actions.updateProperty('path', undefined,   val)}}
										value={config.path}
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
							options: watch,
							key: 'watch',
							title: 'File Watcher',
						}}
						actions={actions}
					/>

					<Feature data={{
							options: sass,
							key: 'sass',
							title: 'CSS Preprocessor',
						}}
						actions={actions}
					/>

					<Feature data={{
							options: javascript,
							key: 'javascript',
							title: 'JS Processing and ES6+',
						}}
						actions={actions}
					/>

					<Feature data={{
							options: dependencyManagement,
							key: 'dependencyManagement',
							title: 'Dependency Management',
						}}
						actions={actions}
					/>

				</article>
				<footer>
					<Link to={'/'} className={styles.link}>
						<FlatButton label="Back" />
					</Link>
				</footer>
			</section>
		);
	}
}

export default Config;


/*
<div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`}>
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment}>
            <i className="fa fa-plus" />
          </button>
          <button className={styles.btn} onClick={decrement}>
            <i className="fa fa-minus" />
          </button>
          <button className={styles.btn} onClick={incrementIfOdd}>odd</button>
          <button className={styles.btn} onClick={() => incrementAsync()}>async</button>
        </div>
*/