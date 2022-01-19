/** @param {NS} ns **/

export async function main(ns) {	
	let response = await serverExists(ns,ns.args[0]);
	ns.tprint(response);	
}

export async function serverExists(ns,serverName){

	let findServer = null;
	try {
		findServer = ns.getServer(serverName);
	} catch {

	}

	return findServer !== null

}
