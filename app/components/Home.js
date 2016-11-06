// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  render() {
	const {toggleServer, serving} = this.props;
    return (
      <article className={styles.container}>
        <header>
          <h2>Project</h2>
        </header>
        <section>
          <button className={styles.btn} onClick={toggleServer}>
            {serving ? 'stop server' : 'start server'}
          </button>
        </section>
        <footer>
          <Link to="/counter">to Counter</Link>
        </footer>
      </article>
    );
  }
}
