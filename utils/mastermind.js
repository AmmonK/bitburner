/** @param {NS} ns **/
import { compileServers } from 'compile-servers';
import { openPorts } from 'open-ports';
import { serverExists } from 'server-exists';
import { setupServer } from 'setup-server';

export async function main(ns) {

	// get updated server information
	let serverList = await compileServers(ns);

	// open ports on servers and nuke
	for(let server of serverList){
		if(!server.hasAdminRights){
			ns.tprint("open ports on : ", server.name);			
			await openPorts(ns,server.name);
		}
	}

	// get updated server information
	serverList = await compileServers(ns);
	// see if we have a bot for the server
	for(let server of serverList){
		let botServerPresent = await hasBotServer(ns,server.name);		
		if(server.hasAdminRights && !botServerPresent){
			// needs bot
			let botMade = await setupServer(ns,server.name)
		}
	}


}

async function hasBotServer(ns,serverName){
	let botName = `bot-${serverName}`;
	return serverExists(ns,botName);
}
