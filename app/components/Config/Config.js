// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Config.css';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import Toggle from 'material-ui/Toggle';
// import Avatar from 'material-ui/Avatar';
// import FileFolder from 'material-ui/svg-icons/file/folder';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Feature from './Feature';

// only in debug
const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}


const linkStyle = {
	color: 'white',
	textDecoration: 'none'
};

const togglePositioning = {
	position: 'absolute',
	right: '15px',
	width: 'auto',
	top: '1.7rem'
};

const radioButton = {
    margin: '20px 0',
    width: '50%', 
    float: 'left'
};





class Config extends Component {
  	componentWillMount() {
  		this.props.fetchConfig(this.props.params.configId);
	};

	render() {
		removeLoader(); // just in debug
		const {sass, javascript, dependencyManagement} = this.props.config;
		const config = this.props.config;
		return (
			<section className="page">
				<article>
					<Card className="section">
						<CardTitle 
							title={config.name} 
							subtitle={config.server.type}
						/>
						<CardText>
							<RadioButtonGroup
								name="serverType" 
								valueSelected={config.server.type}
								onChange={this.props.setServerType}
							>
						      <RadioButton
						        value="express"
						        label="Express"
						        style={radioButton}
						      />
						      <RadioButton
						        value="proxy"
						        label="Proxy existing server"
						        style={radioButton}
						      />
						    </RadioButtonGroup>

							<TextField 
								defaultValue={config.server.target}
								style={{width: '100%'}}
								hintText={config.server.type === "express" ? "Root folder to start server in" : "URL of server"}
								hintStyle={{color: 'rgba(180,180,180,0.5)'}}
							/>
						</CardText>
					</Card>

					<Feature data={{
						options: sass,
						key: 'sass',
						title: 'CSS Preprocessor',
						toggleFeature: this.props.toggleFeature
					}}/>

					<Feature data={{
						options: javascript,
						key: 'javascript',
						title: 'JS Processing and ES6+',
						toggleFeature: this.props.toggleFeature
					}}/>

					<Feature data={{
						options: dependencyManagement,
						key: 'dependencyManagement',
						title: 'Dependency Management',
						toggleFeature: this.props.toggleFeature
					}}/>

				</article>
				<footer>
					<Link to={'/'} style={linkStyle}>
						<FlatButton label="Back" />
					</Link>
				</footer>
			</section>
		);
	}
}

export default Config;

/*
<Card className="section" expanded={sass.enabled}>
	<CardHeader
		title="Sass Preprocessor"
		subtitle={this.printState(sass.enabled)}
		avatar={<Avatar style={{backgroundColor: '#fac415'}} src="./assets/images/sass_logo.png" />}
	>
		<Toggle 
			style={togglePositioning} 
			toggled={sass.enabled}
			onTouchTap={() => {this.props.toggleFeature('sass')}}
		/>
	</CardHeader>

	<CardText expandable={true}>
		The dir
	</CardText>
	<CardText expandable={true}>
		The globs
	</CardText>
</Card>

<Card className="section" expanded={javascript.enabled}>
	<CardHeader
		title="Javascript ES6+"
		subtitle={this.printState(javascript.enabled)}
		avatar={<Avatar src="./assets/images/js_logo.jpg" />}
	>
		<Toggle 
			style={togglePositioning} 
			toggled={javascript.enabled} 
			onTouchTap={() => {this.props.toggleFeature('javascript')}}
		/>
	</CardHeader>

	<CardText expandable={true}>
		The dir
	</CardText>
	<CardText expandable={true}>
		The globs
	</CardText>
</Card>

<Card className="section" expanded={dependencyManagement.enabled}>
	<CardHeader
		title="Dependency Management"
		subtitle={this.printState(dependencyManagement.enabled)}
		avatar={<Avatar style={{backgroundColor: '#fac415'}} src="./assets/images/bower_logo.png" />}
	>
		<Toggle 
			style={togglePositioning} 
			toggled={dependencyManagement.enabled}
			onTouchTap={() => {this.props.toggleFeature('dependencyManagement')}}
		/>
	</CardHeader>

	<CardText expandable={!this.props.config.dependencyManagement.enabled}>
		The dir
	</CardText>
	<CardText expandable={true}>
		The globs
	</CardText>
</Card>
*/


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