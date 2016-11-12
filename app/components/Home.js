// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import RaisedButton from 'material-ui/RaisedButton';
import NavBar from './NavBar.js';



export default class Home extends Component {
  render() {
	const {toggleServer, serving} = this.props;
    return (
    	<section className={styles.container}>
	    	<NavBar></NavBar>
    		
		    <article className="page">
		        <header>
		          <h2>Project</h2>
		        </header>
		        <section>

		          <button className={styles.btn} onClick={toggleServer}>
		            {serving ? 'stop server' : 'start server'}
		          </button>
		        </section>
		        <footer>
		          <RaisedButton label="Default" />
		        </footer>
		    </article>
    	</section>
    );
  }
}
