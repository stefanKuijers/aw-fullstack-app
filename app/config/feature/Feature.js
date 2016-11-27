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
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';


const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon/>
  </IconButton>
);

class Feature extends Component {
	printState(flag) {
		return flag ? "enabled":"disabled";
	};

	moveGlob(configId, key, index, newIndex) {
		if (newIndex >= 0 && newIndex < this.props.data.options.globs.length) {
			this.props.actions.moveGlob(configId, key, index, newIndex);
		}
	}

	createInputListItem(
		configId, index, actions, key, property, value, hintText = './path/to/files/**/*'
	) {
		return (
			<ListItem 
				key={index} 
				className={styles.listItem}
				rightIconButton={
					<IconMenu iconButtonElement={iconButtonElement}>
					    <MenuItem onTouchTap={() => {this.moveGlob(configId, key, index, index-1)}}>Move Up</MenuItem>
					    <MenuItem onTouchTap={() => {this.moveGlob(configId, key, index, index+1)}}>Move Down</MenuItem>
					    <Divider />
					    <MenuItem onTouchTap={() => {actions.removeGlob(configId, key, index)}}>Delete</MenuItem>
					</IconMenu>
				}
			>
				<TextField 
					onChange={(e, val) => { actions.updateProperty(key, property, val, index) }}
					value={value}
					style={{width: '100%'}}
					hintText={hintText}
					hintStyle={{color: 'rgba(180,180,180,0.5)'}}
				/>
			</ListItem>
		);
	}

	createInputListItems(configId, globs, key, property, actions) {
		if (globs) {
			return globs.map((glob, index) => {
				return (this.createInputListItem(configId, index, actions, key, property, glob));
			});
		}
	}

	renderContent(configId, key, options, actions) {
		if (key !== 'dependencyManagement') {
			return(
					<CardText 
						expandable={true}
						className={styles.cardText}
					>
						<List>
							{((key !== 'watch') ? this.createInputListItem(
								configId, 'outputDir', actions, key, 'outputDir', options.outputDir, 'Output Folder'
							) : null)}
							{((key === 'sass') ? this.createInputListItem(
								configId, 'fontsDir', actions, key, 'fontsDir', options.fontsDir, 'Path to Font Folder'
							) : null)}
						</List>

						<List>
					        <Subheader className={styles.subHeader}>Globs</Subheader>

					        {this.createInputListItems(configId, options.globs, key, 'globs', actions)}

					        <ListItem
					        	key="addNew"
					        	onTouchTap={() => {actions.addGlob(configId, key)}}
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
		const imgUrl = `./config/feature/${data.key}_logo.png`;

		return (
			<Card className="section" expanded={options.enabled}>
				<CardHeader
					title={data.title}
					subtitle={this.printState(options.enabled)}
					avatar={<Avatar style={{backgroundColor: '#fac415'}} src={imgUrl} />}
				>
					<Toggle 
						className={styles.toggle} 
						toggled={options.enabled}
						onTouchTap={() => {actions.updateProperty(data.key, 'enabled', !options.enabled)}}
					/>
				</CardHeader>

				{this.renderContent(data.configId, data.key, options, actions)}

			</Card>
		);
	}
}

export default Feature;

