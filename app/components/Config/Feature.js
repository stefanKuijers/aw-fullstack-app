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

	renderContent(data, options) {
		if (data.key !== 'dependencyManagement') {
			return(
					<CardText expandable={true}>
						<TextField 
							defaultValue={options.outputDir}
							style={{width: '100%'}}
							hintText="Output Folder"
							hintStyle={{color: 'rgba(180,180,180,0.5)'}}
						/>

						<List>
					        <Subheader>Globs</Subheader>

					        {this.createListItems(options.globs)}

					        <ListItem
								leftAvatar={<Avatar icon={<AddIcon/>} />}
								primaryText="Add new glob"
							/>
					    </List>
					</CardText>
			);
		}
	}

	createListItems(globs) {
		if (globs) {
			return globs.map((glob, index) => {
				return (
					<ListItem key={index}>
						<TextField 
							defaultValue={glob}
							style={{width: '100%'}}
							hintText="glob"
							hintStyle={{color: 'rgba(180,180,180,0.5)'}}
						/>
					</ListItem>
				);
			});
		}
	}

	render() {
		const options = this.props.data.options;
		const data = this.props.data;
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

				{this.renderContent(data, options)}

			</Card>
		);
	}
}

export default Feature;

