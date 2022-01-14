/** @param {NS} ns **/
export async function main(ns) {


	

	let masterList = [];
	let serversToScan = ["home"];
	let scanCount = 0;


	for(let i = 0; i < 29; i++){
		let tempList = []
		for(let s of serversToScan){
			ns.tprint("scanning: ",s);
			let result = await ns.scan(s);
			ns.tprint("result: ",result);
			scanCount++;
			tempList = addServers(tempList,result);
			tempList = tempList.filter(serv => masterList.filter(x => x == serv).length == 0);
			ns.tprint(tempList);
		}
		serversToScan = tempList;
		masterList = addServers(masterList,tempList);
		masterList = [...new Set(masterList)];		
		ns.tprint("results of level scan: ",tempList);
		ns.tprint("---------------------------------------------------");
	}


	ns.tprint(scanCount);
	ns.tprint(masterList.length);
	ns.tprint(masterList);

	let moneyList = [];
	let noMoneyList = [];
	let rootList = [];
	let unhackedList = []
	let notYetList = [];
	let attackList = [];

	for(let s of masterList){
		let money = await ns.getServerMaxMoney(s);
		if(money > 0) moneyList.push(s);
		if(money == 0) noMoneyList.push(s);
		let root = await ns.hasRootAccess(s);
		if(root) rootList.push(s);
		let hackLevel = ns.getServerRequiredHackingLevel(s);
		if(hackLevel <= ns.getHackingLevel() && !root){
			unhackedList.push(s);
		}
		if(hackLevel > ns.getHackingLevel() && !root){
			notYetList.push(s);
		}
		if(money > 0 && root){
			attackList.push(s);
		}
	}

	ns.tprint("--------moneyList");
	ns.tprint(moneyList.length);
	ns.tprint(moneyList);

	ns.tprint("--------noMoneyList");
	ns.tprint(noMoneyList.length);
	ns.tprint(noMoneyList);

	ns.tprint("--------rootList");
	ns.tprint(rootList.length);
	ns.tprint(rootList);

	ns.tprint("--------unhackedList");
	ns.tprint(unhackedList.length);
	ns.tprint(unhackedList);

	ns.tprint("--------notYetList");
	ns.tprint(notYetList.length);
	ns.tprint(notYetList);
	
	openPorts(ns,unhackedList);
	//await setupServers(ns,rootList);
	
	ns.tprint("--------attackList");
	ns.tprint(attackList.length);
	ns.tprint(attackList);


	ns.tprint(ns.getServerMoneyAvailable("home"));
	await setupServers(ns,attackList);
}


function openPorts(ns,list){
	for(let s of list){
		ns.exec("ports-named.js","home",1,s);
	}
}

async function setupServers(ns,list){

	for(let s of list){
		if(!ns.serverExists("bot-"+s)){
			ns.tprint("need to attack ",s)
			if(ns.getPurchasedServerCost(1024) < ns.getServerMoneyAvailable("home")){
				ns.tprint("running test.js for ",s);
				ns.exec("test.js","home",1,s);
				await ns.sleep(2000);
				ns.tprint("running attackServer.js for ",s);
				ns.exec("attackServer.js","home",1,s);
				await ns.sleep(2000);
			}			
		}
	}

}



function cleanList(list){
	return list.filter(x => !x.includes("bot-") && x !== "home");
}

function addServers(originalList,newList){
	originalList = [...new Set(originalList)];
	newList = [...new Set(newList)];
	return [...cleanList(originalList), ...cleanList(newList)];
}
