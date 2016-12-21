// @flow
import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import styles from './Welcome.css';

const removeLoader = function () {
	const element = document.getElementById('app-container');
	element.className = 'app-loaded';
}


export default class Welcome extends Component {
	componentWillMount() {
		this.props.checkActivation();
	}

	activate = () => {
		if (this.props.profile.username && this.props.profile.username.length > 3) {
			this.props.activate();
		}
	}

	renderWelcome() {
		return(
			<section>
				<header>
					<h1>Welcome<br />{this.props.profile.username}</h1>
				</header>
			</section>
		);
	}

	renderActivate() {
		return(
			<section>
				<header>
					<h1>Hi there!</h1>
					<h2>What's your name?</h2>
				</header>
				<section>
					<TextField 
						onChange={(e, val) => {this.props.updateName(val);}}
						onKeyDown={(e, el) => {if (e.keyCode === 13) this.activate() }}
						value={this.props.profile.username}
						style={{width: '100%'}}
						hintText="please enter your name"
					/>
				</section>
				<footer>
					<RaisedButton 
						label="Activate" 
						primary={true}
						onTouchTap={this.activate} />
				</footer>
			</section>
		);
	}

	render() {
		removeLoader();

		return (
			<article className={styles.container}>
				{(this.props.profile.activated) ? this.renderWelcome() : this.renderActivate()}
			</article>
		);
	}
}
