/** @param {NS} ns **/


 export async function main(ns){    
     return await getServerPath(ns,ns.args[0]);
 }

export async function getServerPath(ns,serverName) {
//Uses a DFS to find the path to the specified server and then prints the path
//to Terminal.

//The target server's HOSTNAME must be a string passed in as an argument to the script.
//It is CASE-SENSITIVE.
//If an invalid hostname is passed the script will probably just run forever.

let target = serverName;

let visited = [];
let stack = [];
let parentTracker = [];
let origin = ns.getHostname();
stack.push(origin);

while(stack.length > 0) {
    let node = stack.pop();
    if (visited.includes(node)) {
        //Do nothing. Essentially a "continue" but that doesn't exist yet
    } else {
        if (node == target) {break;}
        visited.push(node);
        let nextNodes = ns.scan(node);
        for (let i = 0; i < nextNodes.length; ++i) {
            stack.push(nextNodes[i]);

            //Keep track of the nodes "parent" so we can re-create the path
            //Ignore entries that start at the origin
            if (nextNodes[i] != origin) {
                let pair = [nextNodes[i], node];
                parentTracker.push(pair);
            }
        }
    }
}


let path = [];
let i = target;
while (i != ns.getHostname()) {
    path.push(i);

    //Search through the parentTracker array to find this nodes parent
    for (let j = 0; j < parentTracker.length; ++j) {
        let pair = parentTracker[j];
        if (pair[0] == i) {
            i = pair[1];
            break;
        }
    }
}

return path.reverse();
}
