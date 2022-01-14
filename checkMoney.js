/** @param {NS} ns **/
export async function main(ns) {

	let numThreads = ns.args[0];

	let serverName = "sigma-cosmetics";

	let maxMoney = await ns.getServerMaxMoney(serverName);
	let minSecurity = await ns.getServerMinSecurityLevel(serverName);
	
	while(ns.getServerMoneyAvailable(serverName) < maxMoney){
		await ns.grow(serverName ,{threads:numThreads});

		if(ns.getServerSecurityLevel(serverName) > 10){
			while(ns.getServerSecurityLevel(serverName) > minSecurity) {
				await ns.weaken(serverName, {threads:numThreads});
			}
		}

	}

}