
import { getGatewayIp, getIpOnGateway } from '../utils/network';	


export default class OnlineProjectServer {
	constructor() {
		this.name = 'online project server';
		this.running = false;
		this.options = {
            open: false,
            port: 8999
        };

        getGatewayIp((ip) => {
			this.gatewayIp = ip;
		});

        this.server = WORKFLOW_PLUGINS.browserSync.create(this.name);
	}

	start(url, callback) {
		this.stop();

		setTimeout(() => {
			this.initServer(url, callback);
		}, 200);
	}

	initServer(url, callback) {
		this.server.init(
			Object.assign(
				{}, 
				this.options,
				{proxy: url}
			),
			(e, serverInstance) => {
				this.running = true;
				callback({
					ip: getIpOnGateway(this.gatewayIp, serverInstance.utils.devIp),
					port: serverInstance.server._connectionKey.slice(-4)
				});
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