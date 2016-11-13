// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import RaisedButton from 'material-ui/RaisedButton';
import NavBar from './NavBar.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme();
const style = {
  color: theme.palette.alternateTextColor,
};

export default class Home extends Component {
  render() {
	const {toggleServer, serving} = this.props;
    return (
    	<section className={styles.container} style={style}>
	    	<NavBar></NavBar>
    		
		    <article className="page">
		        <header>
		          <h2>Project</h2>
		        </header>
		        <section>
		        	<p>lorem foo</p>
		        </section>
		        <footer>
		          <RaisedButton 
		          	onClick={toggleServer} 
		          	primary={true}
		          	label={serving ? 'stop server' : 'start server'}
		          />
		        </footer>
		    </article>
    	</section>
    );
  }
}
