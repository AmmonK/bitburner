import { compileServers } from 'compile-servers';
import { openPorts } from 'open-ports';

/** @param {NS} ns **/
export async function main(ns) {
	let serverList = await compileServers(ns);

	let honey = serverList.filter(server => !server.purchasedByPlayer && server.moneyMax==0);
	
	for(let h of honey){
		ns.tprint("opening ports on ", h.name);
		await openPorts(ns,h.name);
		ns.tprint(h.organizationName);
		if (ns.getHackingLevel() >= h.requiredHackingSkill){
			ns.tprint("hacking ", h.name);
			await ns.hack(h.name);
			ns.tprint(h.path);
			ns.tprint("connect ",h.path.join(";connect "),";hack;backdoor");				
		}
	
		
	}

}
