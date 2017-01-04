
import network from 'network';	


export function getGatewayIp(callback) {
	network.get_gateway_ip((err, ip) => {
		callback(err ? '' : ip);
		if (err) throw err;
	});
}

export function getIpOnGateway(gatewayIp, ips) {
	let ipIndex = 0;

	if (ips.length > 1) {
		const lanIp = getLanIp(gatewayIp);

		for (let i = ips.length - 1; i >= 0; i--) {
			if (getLanIp(ips[i]) === lanIp) ipIndex = i;
		}
	}

	return ips[ipIndex];
}

export function getLanIp(ip) {
	return ip.split('.').slice(0,3).join('.');
}