/** @param {NS} ns **/
import { calculateScripts } from 'calculate.js';

export async function main(ns) {
	const serverName = ns.args[0];
	const botName = "bot-"+serverName;

	let serverRam = await ns.getServerMaxRam(botName);
	let threads = await calculateScripts(ns,serverRam)

	await ns.scp("hack.js",botName);
	await ns.scp("grow.js",botName);
	await ns.scp("weaken.js",botName);

	await ns.exec("hack.js",botName,threads.hack,serverName);
	await ns.exec("grow.js",botName,threads.grow,serverName);
	await ns.exec("weaken.js",botName,threads.weaken,serverName);
}