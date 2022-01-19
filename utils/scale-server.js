import { copyPackages } from "copyPackages";

/** @param {NS} ns **/

export async function main(ns){
	await upgradeServer(ns,ns.args[0]);
}

export async function upgradeServer(ns,server) {
	let serverName = server;

	let maxRam = await ns.getServerMaxRam(serverName);
	ns.tprint(maxRam);

	let multiplier = await getRamMultiplier(maxRam);
	let upgradeRam = Math.pow(2,multiplier+1);

	let currentCost = await ns.getPurchasedServerCost(maxRam);		
	let upgradeCost = await ns.getPurchasedServerCost(upgradeRam);

	let  formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits:0

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});



	ns.tprint("Current: ",formatter.format(currentCost));
	ns.tprint("Current Ram: ", maxRam);
	ns.tprint("Upgrade: ",formatter.format(upgradeCost));
	ns.tprint("Upgrade Ram: ", upgradeRam);

	if(ns.getServerMoneyAvailable("home") > upgradeCost){
		ns.tprint("can afford upgrade");

		let upgradeName = `${serverName}-${upgradeRam}`

		// cleanup old server
		let killResponse = await ns.kill("attackServer.js","home",serverName.replace("bot-",""));
		ns.tprint(killResponse);
		await ns.killall(serverName);
		let deleteResponse = await ns.deleteServer(serverName);
		ns.tprint("Deleted: ",serverName,deleteResponse);

		// provision new server
		let newServer = await ns.purchaseServer(upgradeName,upgradeRam);
		ns.tprint("New server: ", newServer);
		await copyPackages(ns,newServer);

		// run attack using new server
		ns.exec("attackServer.js","home",1,serverName.replace("bot-",""))

	}


}


async function getRamMultiplier(ram){

	let multi = 1;
	while(Math.pow(2,multi) < ram){
		multi++;
	}

	return multi;

}
