/** @param {NS} ns **/
export async function main(ns) {

	//TODO
	// make a list of servers to exclude; home?
	// make a list of prefixes to include (our servers)
	// send in iterations as args 
	
	let serverList = ["home"];
	
	for(let i = 0; i < 6; i++){
		let result = await scanServers(ns,serverList);
		serverList = [...serverList,...result]
		serverList = [...new Set(serverList.filter(s => s !== "home"))];
	}

	ns.tprint(serverList.length);
	ns.tprint(serverList);

}

async function scanServers(ns,hosts){

	let result = []
	for(let host of hosts){
		let scanResult = await (scanServer(ns,host));
		result = [...result,...scanResult];
	}
	return result;
}


async function scanServer(ns, host){
	//ns.tprint("scanning:",host);
	return await ns.scan(host).filter(s => !s.includes("bot-"));
}