


export default class OnlineProjectServer {
	constructor() {
		this.name = 'online project server';
		this.running = false;
		this.options = {
            open: false,
            port: 8999,
            ghostMode: false
        };

        this.server = WORKFLOW_PLUGINS.browserSync.create(this.name);
	}

	start(url, callback) {
		this.stop();

		setTimeout(() => {
			this.initServer(url, callback);
		}, 300);
	}

	initServer(url, callback) {
		this.server.init(
			Object.assign(
				{}, 
				this.options,
				{proxy: url}
			),
			() => {
				this.running = true;
				callback();
			}
		);
	}

	stop() {
		if (this.running) {
			this.server.exit();
			this.running = false;
		}
	}
}