// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Config.css';

const linkStyle = {
	color: 'white',
	textDecoration: 'none'
}

class Config extends Component {
  	componentDidMount() {
  		console.log(this.props.projects);
  		this.props.fetchConfig(this.props.params.configId);
	};

	render() {
		// const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
		return (
		  <div>
		    <pre>{this.props.params.configId}</pre>
		    <Link to={'/'} style={linkStyle}>Project List</Link>
		  </div>
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