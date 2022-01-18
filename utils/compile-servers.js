/** @param {NS} ns **/
import { getServers } from 'get-servers';
import { serverDetails} from 'server-details';

export async function main(ns) {

	// get list of all known servers
	let servers = await getServers(ns);

	let compiledList = []

	// iterate list and get the details
	for(let server of servers){
		let details = await serverDetails(ns,server);
		compiledList.push(details);
	}

	//ns.tprint(compiledList);

	let withRoot = compiledList.filter(x => x.hasRoot);
	let withMoney = compiledList.filter( x => x.money > 0);
	ns.tprint("root: ",withRoot.length);
	ns.tprint("money: ",withMoney.length);
	ns.tprint(compiledList[10]);


}
