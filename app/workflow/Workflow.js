
export default class Workflow {

	constructor(project, projectConfig, callback) {
		console.warn(
			'USING GLOBAL CONFIG.',
			'This needs to be refactored to make multiple workflows run next to eachother'
		);

		config.load(JSON.stringify(projectConfig));

		this.id = Date.now();
		this.projectId = project.id;
		this.configId = projectConfig.id;

		this.start(callback);

		return this;
	}

	start(callback) {
		this.browserSync = config.browserSync.task((e, browserSyncInstance) => {
			const portKey = browserSyncInstance.server._connectionKey;
			this.server = {
				ip: browserSyncInstance.utils.devIp[0],
				port: portKey.slice(portKey.length-4)
			};

			callback(this);
		});

		if (config.watch.enabled) {this.watch = config.watch.task();}

		this.build();
	}

	build(callback) {
		if (config.dependencyManagement.enabled) {config.dependencyManagement.task()}
		if (config.sass.enabled) {config.sass.task()}
		if (config.javascript.enabled) {config.javascript.task()}

		setTimeout(() => {
			callback();
		}, 2000);
	}

	stop() {
		console.warn(
			'STOPPING GLOBAL BS',
			'Has workflow needs refactor to be able to run multiple instances'
		);
		plugin.browserSync.exit();
		// this.browserSync.exit();

		if (config.watch.enabled) {
	    	this.watch.close();
	    }
	}
}