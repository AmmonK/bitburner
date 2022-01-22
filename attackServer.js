/** @param {NS} ns **/
export async function main(ns){
	let targetName = ns.args[0];
	let botName = "bot-" + targetName;

	let maxRam = ns.getServerMaxRam(botName);
	
	let numHackThreads = maxRam / ns.getScriptRam("min-hack.js",botName);
	if(numHhackThreads < 1) numHackThreads = 1;
	let numGrowThreads = maxRam / ns.getScriptRam("min-grow.js",botName);
	if (numGrowThreads < 1) numGrowThreads = 1;
	let numWeakThreads = maxRam / ns.getScriptRam("min-weak.js",botName);	
	if (numWeakThreads < 1) numWeakThreads = 1;
		
	while(true){
		while(ns.getServerMaxMoney(targetName) > ns.getServerMoneyAvailable(targetName)){
			await ns.exec("min-grow.js",botName,numGrowThreads,targetName);	
			await ns.sleep(ns.getGrowTime(targetName) + 500);
		}

		while(ns.getServerSecurityLevel(targetName) > ns.getServerMinSecurityLevel(targetName)){
			await ns.exec("min-weak.js",botName,numWeakThreads,targetName);	
			await ns.sleep(ns.getWeakenTime(targetName) + 500);
		}

		await ns.exec("min-hack.js",botName,numHackThreads,targetName);
		await ns.sleep(ns.getHackTime(targetName) + 500);
	}

}
