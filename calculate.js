/** @param {NS} ns **/
export async function main(ns) {

	let hostName = ns.getHostname();

	let totalRam = await ns.getServerMaxRam(hostName);

	let growCost = await ns.getScriptRam("grow.ns",hostName);
	let growThreads = Math.floor((totalRam / 2) / growCost);
	let growRam = growCost * growThreads;

	// 50% grow
	ns.tprint("--------[Grow 50%]--------")
	ns.tprint("Grow cost: ", growCost);		
	ns.tprint("Grow Threads: ", growThreads);
	ns.tprint("Grow Ram: ",growRam);	


	let hackCost = await ns.getScriptRam("hack.ns",hostName);
	let hackThreads = Math.floor((totalRam / 5) / hackCost);
	let hackRam = hackCost * hackThreads;

	// 20% hack
	ns.tprint("--------[Hack 20%]--------")
	ns.tprint("Hack cost: ", hackCost);
	ns.tprint("Hack Threads:", hackThreads);
	ns.tprint("Hack Ram: ", hackRam);


	let weakenCost = await ns.getScriptRam("weaken.ns",hostName);
	let weakenThreads = Math.floor((totalRam - growRam - hackRam)/weakenCost);
	let weakenRam = weakenCost * weakenThreads;

	// 30% weaken
	ns.tprint("--------[Weak 30%]--------")
	ns.tprint("Weaken cost: ", weakenCost);
	ns.tprint("Weaken Threads: ",weakenThreads);
	ns.tprint("Weaken Ram: ",weakenRam);
	
	ns.tprint("--------------------------");
	ns.tprint("Total Cost Ram: ",growRam + hackRam + weakenRam);
	ns.tprint("Total Avail Ram: ", totalRam);

}