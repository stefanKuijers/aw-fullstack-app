// @flow
import React, { Component } from 'react';
import styles from './Feature.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import AddIcon from 'material-ui/svg-icons/content/add';

class Feature extends Component {
	printState(flag) {
		return flag ? "enabled":"disabled";
	};

	createInputListItem(
		index, actions, key, property, value, hintText = './path/to/files/**/*'
	) {
		return (
			<ListItem key={index} className={styles.listItem}>
				<TextField 
					onChange={(e, val) => { actions.updateProperty(key, property, val, index) }}
					defaultValue={value}
					style={{width: '100%'}}
					hintText={hintText}
					hintStyle={{color: 'rgba(180,180,180,0.5)'}}
				/>
			</ListItem>
		);
	}

	createInputListItems(globs, key, property, actions) {
		if (globs) {
			return globs.map((glob, index) => {
				return (this.createInputListItem(index, actions, key, property, glob));
			});
		}
	}

	renderContent(key, options, actions) {
		if (key !== 'dependencyManagement') {
			return(
					<CardText 
						expandable={true}
						className={styles.cardText}
					>
						<List>
							{((key !== 'watch') ? this.createInputListItem(
								'outputDir', actions, key, 'outputDir', options.outputDir, 'Output Folder'
							) : null)}
							{((key === 'sass') ? this.createInputListItem(
								'fontsDir', actions, key, 'fontsDir', options.fontsDir, 'Path to Font Folder'
							) : null)}
						</List>

						<List>
					        <Subheader className={styles.subHeader}>Globs</Subheader>

					        {this.createInputListItems(options.globs, key, 'globs', actions)}

					        <ListItem
					        	key="addNew"
								leftAvatar={<Avatar icon={<AddIcon/>} />}
								primaryText="Add new glob"
							/>
					    </List>
					</CardText>
			);
		}
	}

	render() {
		const options = this.props.data.options;
		const data = this.props.data;
		const actions = this.props.actions;
		return (
			<Card className="section" expanded={options.enabled}>
				<CardHeader
					title={data.title}
					subtitle={this.printState(options.enabled)}
					avatar={<Avatar style={{backgroundColor: '#fac415'}} src={`./assets/images/${data.key}_logo.png`} />}
				>
					<Toggle 
						className={styles.toggle} 
						toggled={options.enabled}
						onTouchTap={() => {actions.updateProperty(data.key, 'enabled', !options.enabled)}}
					/>
				</CardHeader>

				{this.renderContent(data.key, options, actions)}

			</Card>
		);
	}
}

export default Feature;

