import { shell } from 'electron';
import network from 'network';	


export default class Workflow {


	constructor(project, projectConfig, callback) {
		this.config = require('./gulpfile.js/config.js')(gulp, WORKFLOW_PLUGINS);
		this.loadConfig(projectConfig);

		this.id = Date.now();
		this.name = projectConfig.name;
		this.projectId = project.id;
		this.configId = projectConfig.id;

		network.get_gateway_ip((err, ip) => {
		  	this.gatewayIp = err ? '' : ip;
		});

		return this;
	}

	start(callback) {
		this.browserSync = this.config.browserSync.task(
			this.name, 
			(e, browserSyncInstance) => {
				const portKey = browserSyncInstance.server._connectionKey;
				
				this.server = {
					ip: this.getIpOnDefaultGateway(browserSyncInstance.utils.devIp),
					port: portKey.slice(portKey.length-4)
				};
				this.server.url = `http://${this.server.ip}:${this.server.port}`;
				
				shell.openExternal(this.server.url);
				callback(this);
			}
		);

		if (this.config.watch.enabled) {this.watch = this.config.watch.task();}
	}

	build(production = false, callback = Function) {
		if (this.config.dependencyManagement.enabled) {this.config.dependencyManagement.task(production)}
		if (this.config.sass.enabled) {this.config.sass.task(production)}
		if (this.config.javascript.enabled) {this.config.javascript.task(null, production)}
		if (this.config.cachebust.enabled && production) {this.config.cachebust.task(production)}

		// each task should call report when finished. when all tasks finished we call the build callback
		setTimeout(() => {
			callback();
		}, 2000);
	}

	stop() {
		this.browserSync.exit();

		if (this.config.watch.enabled) {
	    	this.watch.close();
	    }
	}

	loadConfig(projectConfig) {
		this.config.load(
			JSON.stringify(projectConfig)
		);
	}

	getIpOnDefaultGateway(ips) {
		let ipIndex = 0;
	
		if (ips.length > 1) {
			const gatewayIpParts = this.gatewayIp.split('.');

			for (var i = ips.length - 1; i >= 0; i--) {
				let ipParts = ips[i].split('.');
				let matches = 0;

				for (var j = gatewayIpParts.length - 1; j >= 0; j--) {
					if (ipParts[j] === gatewayIpParts[j]) {
						matches++;
					}
				}

				if (matches === 3) ipIndex = i;
			}
		}

		return ips[ipIndex];
	}
}