import { copyPackages } from './copyPackages';
import { purchaseServer } from './purchaseServer';

/** @param {NS} ns **/
export async function main(ns) {
	
	let botName = "bot-" + ns.args[0];
	await purchaseServer(ns,botName,1024);
	await copyPackages(ns,botName);

}