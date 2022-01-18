/** @param {NS} ns **/
export async function getServers(ns) {

	// default server prefix to exclude
	let excludePrefix = "bot-";
	// if passed a different prefix, use that instead
	if(ns.args[0]){
		excludePrefix = ns.args[0];
	}

	// init a stack to hold servers to scan
	let stack = [];
	// keep track of the servers we have visited
	let visited = [];
	// get the starting origin
	let origin = ns.getHostname();
	// start with the origin
	stack.push(origin);
	
	// while there are servers to scan
	while(stack.length > 0){		
		// get the next server to scan
		let node = stack.pop();
		// make sure we haven't already visited, and it does not have the exclude prefix
		if(!visited.includes(node) && node.substring(0,excludePrefix.length) !== excludePrefix){						
			// add to visited list
			visited.push(node);
			// the the nodes below the existing node
			let nextNodes = ns.scan(node);
			// add them to the stack to scan
			for (let i = 0; i < nextNodes.length; ++i) {				
				stack.push(nextNodes[i]);				
			}
		}
	}	
	// exclude home
	visited = visited.filter(node => node !== "home");
	// return visited servers
	return visited;

}

export async function main(ns){
	// get list of servers
	let response = await getServers(ns);	
	// output to console
	ns.tprint(response);
}
