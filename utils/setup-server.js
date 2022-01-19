/** @param {NS} ns **/
import { serverExists } from 'server-exists';
import { getAffordableRam } from 'get-affordable-ram';
import { copyPackages } from 'copy-packages';

export async function main(ns) {
	let response = setupServer(ns,ns.args[0]);
	return response;
}


export async function setupServer(ns,serverName){
	let newServerName = `bot-${serverName}`;
	if(await serverExists(ns,newServerName)) return null;

	let ram = await getAffordableRam(ns);
	let newServer = await ns.purchaseServer(newServerName,ram);

	await copyPackages(ns,newServer);
	return newServer;
}
