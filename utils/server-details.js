/** @param {NS} ns **/
import { getServerPath } from 'find-server.js';

export async function serverDetails(ns, serverName) {

	let serverPath = await getServerPath(ns,serverName);

	let server = ns.getServer(serverName);
	return{
		name: serverName,
		...server,
		path: serverPath
	}


}

export async function main(ns){
	let result = await serverDetails(ns,ns.args[0]);	
	ns.tprint(result);
}
