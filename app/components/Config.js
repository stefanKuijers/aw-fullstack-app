// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Config.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Paper from 'material-ui/Paper';



const linkStyle = {
	color: 'white',
	textDecoration: 'none'
}

class Config extends Component {
  	componentDidMount() {
  		this.props.fetchConfig(this.props.params.configId);
	};

	render() {
		return (
			<section>
				<header>
					
				</header>
				<article>
					<Paper>
						<h1>{this.props.config.name}</h1>
						<div>server: {this.props.config.server}</div>
					</Paper>
					<Card expanded={false}>
						<CardHeader
							title="Sass"
							avatar="sass Icon"
							actAsExpander={true}
							showExpandableButton={true}
						>
							<Toggle toggled={false} />
						</CardHeader>

						<CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
						<CardText expandable={true}>
							The dir
						</CardText>
						<CardText expandable={true}>
							The globs
						</CardText>
					</Card>
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