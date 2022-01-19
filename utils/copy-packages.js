/** @param {NS} ns **/
export async function copyPackages(ns,host) {

	let destinationHost = host;
	await ns.scp("min-hack.js",destinationHost);
	await ns.scp("min-grow.js",destinationHost);
	await ns.scp("min-weak.js",destinationHost);

}

export async function main(ns){
	await copyPackages(ns,ns.args[0]);
}
