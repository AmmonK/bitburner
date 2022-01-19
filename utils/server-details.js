/** @param {NS} ns **/
import { getServerPath } from 'find-server.js';

export async function serverDetails(ns, serverName) {

	let server = serverName;	
	let maxMoney = await ns.getServerMaxMoney(server);
	let minSecurity = await ns.getServerMinSecurityLevel(server);
	let portsRequired = await ns.getServerNumPortsRequired(server);
	let growTime = await ns.getGrowTime(server);
	let weakTime = await ns.getWeakenTime(server);
	let hackTime = await ns.getHackTime(server);
	let hackLevel = await ns.getServerRequiredHackingLevel(server);
	let hasRoot = await ns.hasRootAccess(server);
	let money = await ns.getServerMoneyAvailable(server);
	let serverPath = await getServerPath(ns,serverName);

	let response = {
		name: server,
		maxMoney: maxMoney,
		minSecurity: minSecurity,
		portsRequired: portsRequired,
		growTime: growTime,
		weakenTime: weakTime,
		hackTime: hackTime,
		hackLevel: hackLevel,
		hasRoot: hasRoot,
		money: money,
		path: serverPath,
	}

	return response;

}

export async function main(ns){
	let result = await serverDetails(ns,ns.args[0]);	
	ns.tprint(result);
}
