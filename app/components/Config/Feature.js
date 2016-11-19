// @flow
import React, { Component } from 'react';
import styles from './Feature.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

const togglePositioning = {
	position: 'absolute',
	right: '15px',
	width: 'auto',
	top: '1.7rem'
};



class Feature extends Component {
	printState(flag) {
		return flag ? "enabled":"disabled";
	};

	render() {
		console.log(this.props.options, this.props.title, this.props.name);
		// removeLoader(); // just in debug
		const options = this.props.data.options;
		const data = this.props.data;
		// const config = this.props.config;
		return (
			<Card className="section" expanded={options.enabled}>
				<CardHeader
					title={data.title}
					subtitle={this.printState(options.enabled)}
					avatar={<Avatar style={{backgroundColor: '#fac415'}} src={`./assets/images/${data.key}_logo.png`} />}
				>
					<Toggle 
						style={togglePositioning} 
						toggled={options.enabled}
						onTouchTap={() => {data.toggleFeature(data.key)}}
					/>
				</CardHeader>

				<CardText expandable={true}>
					The dir
				</CardText>
				<CardText expandable={true}>
					The globs
				</CardText>
			</Card>
		);
	}
}

export default Feature;

