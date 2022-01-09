/** @param {NS} ns **/
export async function main(ns) {
	const result = await ns.run("purchase-server.script",1,ns.args[0]+"-server",256);
	ns.tprint(result);
	await ns.scp(ns.args[0]+".ns",ns.args[0]+"-server");
	await ns.scp("bootstrap.ns",ns.args[0]+"-server");
}