/** @param {NS} ns **/
export async function main(ns) {

	const hosts = ['n00dles','foodnstuff','harakiri-sushi','hong-fang-tea','iron-gym','joesguns','sigma-cosmetics','max-hardware','nectar-net','zer0','CSEC'];
	for(const host of hosts){
		ns.run(ns.args[0],ns.args[1],host);
	}
}