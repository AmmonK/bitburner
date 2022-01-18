/** @param {NS} ns **/
import { getServers } from 'get-servers';
import { serverDetails} from 'server-details';

export async function compileServers(ns) {

	// get list of all known servers
	let servers = await getServers(ns);

	let compiledList = []

	// iterate list and get the details
	for(let server of servers){
		let details = await serverDetails(ns,server);
		compiledList.push(details);
	}

	return compiledList;

}

export async function main(ns){
	let result = await compileServers(ns);
	ns.tprint(result);
}
