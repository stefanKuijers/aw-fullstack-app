// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Other.css';


export default class Other extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
        	<header>
	          <h2>Other</h2>
        	</header>
        	<nav>
        		<ul>
        			<li>
						<Link to="/">back home</Link>
        			</li>
        		</ul>
        	</nav>
        </div>
      </div>
    );
  }
}
