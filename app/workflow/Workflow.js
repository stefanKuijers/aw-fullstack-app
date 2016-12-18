
export default class Workflow {

	constructor(project, projectConfig, callback) {
		this.config = require('./gulpfile.js/config.js')(gulp, WORKFLOW_PLUGINS);
		this.loadConfig(projectConfig);

		this.id = Date.now();
		this.name = project.name;
		this.projectId = project.id;
		this.configId = projectConfig.id;

		return this;
	}

	start(callback) {
		this.browserSync = this.config.browserSync.task(
			this.name, 
			(e, browserSyncInstance) => {

				const portKey = browserSyncInstance.server._connectionKey;
				
				this.server = {
					ip: browserSyncInstance.utils.devIp[0],
					port: portKey.slice(portKey.length-4)
				};

				callback(this);
			}
		);

		if (this.config.watch.enabled) {this.watch = this.config.watch.task();}
	}

	build(callback = Function) {
		if (this.config.dependencyManagement.enabled) {this.config.dependencyManagement.task()}
		if (this.config.sass.enabled) {this.config.sass.task()}
		if (this.config.javascript.enabled) {this.config.javascript.task()}

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
}