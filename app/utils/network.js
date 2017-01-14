
import network from 'network';	

import { logAction } from '../app/stateStorage';


export function getGatewayIp(callback) {
	network.get_gateway_ip((err, ip) => {
		let response = err ? '' : ip;
		logAction({
			type: 'RECIEVED_GATEWAY_IP',
			payload: response
		});

		callback(response);
		if (err) throw err;
	});
}

export function getIpOnGateway(gatewayIp, ips) {
	let ipIndex = 0;

	logAction({
		type: 'RECIEVED_AVAILABLE_IPS',
		payload: ips
	});

	if (ips.length > 1) {
		const lanIp = getLanIp(gatewayIp);

		for (let i = ips.length - 1; i >= 0; i--) {
			if (getLanIp(ips[i]) === lanIp) ipIndex = i;
		}
	}

	logAction({
		type: 'RETURN_IP_ON_GATEWAY',
		payload: ips[ipIndex]
	});

	return ips[ipIndex];
}

export function getLanIp(ip) {
	const lanIP = ip.split('.').slice(0,3).join('.');
	logAction({
		type: 'EXTRACTED_LAN_IP',
		payload: lanIP
	});

	return lanIP;
}