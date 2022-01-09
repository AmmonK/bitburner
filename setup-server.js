/** @param {NS} ns **/
export async function main(ns) {
	const serverName = ns.args[0];
	const botName = "bot-"+serverName;

	await ns.scp("hack.js",botName);
	await ns.scp("grow.js",botName);
	await ns.scp("weaken.js",botName);

	await ns.exec("hack.js",botName,40,serverName);
	await ns.exec("grow.js",botName,40,serverName);
	await ns.exec("weaken.js",botName,40,serverName);
}