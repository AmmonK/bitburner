/** @param {NS} ns **/
export async function main(ns) {

	let targetName = ns.args[0];
	let botName = "bot-" + targetName;

	let maxRam = ns.getServerMaxRam(botName);
	
	let numHackThreads = maxRam / ns.getScriptRam("min-hack.js",botName);
	let numGrowThreads = maxRam / ns.getScriptRam("min-grow.js",botName);
	let numWeakThreads = maxRam / ns.getScriptRam("min-weak.js",botName);	
		
	while(true){
		while(ns.getServerMaxMoney(targetName) > ns.getServerMoneyAvailable(targetName)){
			await ns.exec("min-grow.js",botName,numGrowThreads,targetName);	
			await ns.sleep(ns.getGrowTime(targetName) + 1000);
		}

		while(ns.getServerSecurityLevel(targetName) > ns.getServerMinSecurityLevel(targetName)){
			await ns.exec("min-weak.js",botName,numWeakThreads,targetName);	
			await ns.sleep(ns.getWeakenTime(targetName) + 1000);
		}

		await ns.exec("min-hack.js",botName,numHackThreads,targetName);
		await ns.sleep(ns.getHackTime(targetName) + 1000);

	}

}