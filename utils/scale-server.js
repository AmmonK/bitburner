import { copyPackages } from "copy-packages";
import { getAffordableRam } from 'get-affordable-ram';

/** @param {NS} ns **/

export async function main(ns){
	await upgradeServer(ns,ns.args[0]);	
}

export async function upgradeServer(ns,serverName) {	

	let maxRam = await ns.getServerMaxRam(serverName);	

	let upgradeRam = await getAffordableRam(ns);
	ns.tprint(serverName, " has ", maxRam, " can have ", upgradeRam);

	if(upgradeRam > maxRam){		
		// cleanup old server
		await ns.kill("attackServer.js","home",serverName.replace("bot-",""));		
		await ns.killall(serverName);
		await ns.deleteServer(serverName);		

		// provision new server
		await ns.purchaseServer(serverName,upgradeRam);		
		await copyPackages(ns,serverName);

		// run attack using new server
		ns.exec("attackServer.js","home",1,serverName.replace("bot-",""))


	}

}
