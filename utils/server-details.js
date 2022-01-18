/** @param {NS} ns **/
export async function serverDetails(ns) {

	let server = ns.args[0];	
	let maxMoney = await ns.getServerMaxMoney(server);
	let minSecurity = await ns.getServerMinSecurityLevel(server);
	let portsRequired = await ns.getServerNumPortsRequired(server);
	let growTime = ns.getGrowTime(server);
	let weakTime = ns.getWeakenTime(server);
	let hackTime = ns.getHackTime(server);
	let hackLevel = ns.getServerRequiredHackingLevel(server);
	let hasRoot = ns.hasRootAccess(server);

	let response = {
		name: server,
		maxMoney: maxMoney,
		minSecurity: minSecurity,
		portsRequired: portsRequired,
		growTime: growTime,
		weakenTime: weakTime,
		hackTime: hackTime,
		hackLevel: hackLevel,
		hasRoot: hasRoot

	}

	return response;

}

export async function main(ns){
	let result = await serverDetails(ns,ns.args[0]);	
	ns.tprint(result);
}
