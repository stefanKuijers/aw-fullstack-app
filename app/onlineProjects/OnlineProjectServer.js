
import proxy from 'express-http-proxy';
const express = require('express');

export default class OnlineProjectServer {
	constructor() {
		this.server = express();
		this.server.get('/', function (req, res) {
		  res.send('Workflow App Online Project Server')
		});

		this.server.listen(8999, function () {
		  console.log('Online Project Server listening on 8999');
		});
	}

	registerNewProject(slug, url) {
		this.server.use(`/${slug}`, proxy(url));
	}

	stop() {
		this.server.stop();
	}

	convertToSlug(text) {
	    return text
	        .toLowerCase()
	        .replace(/[^\w ]+/g,'')
	        .replace(/ +/g,'-')
	        ;
	}
}