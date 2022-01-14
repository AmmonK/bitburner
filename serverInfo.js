/** @param {NS} ns **/
export async function main(ns) {

	let hostName = ns.args[0];

	ns.tprint("Max $: ", ns.getServerMaxMoney(hostName));
	ns.tprint("Cur $: ", ns.getServerMoneyAvailable(hostName));
}