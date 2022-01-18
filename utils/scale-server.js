/** @param {NS} ns **/
export async function main(ns) {
	let serverName = ns.args[0];

	let maxRam = await ns.getServerMaxRam(serverName);
	ns.tprint(maxRam);

	let multiplier = await getRamMultiplier(maxRam) +1;

	let currentCost = await ns.getPurchasedServerCost(maxRam);		
	let upgradeCost = await ns.getPurchasedServerCost(Math.pow(2,multiplier));


	let  formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits:0

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	ns.tprint("Current: ",formatter.format(currentCost));
	ns.tprint("Current Ram: ", maxRam);
	ns.tprint("Upgrade: ",formatter.format(upgradeCost));
	ns.tprint("Upgrade Ram: ", Math.pow(2,multiplier));

	if(ns.getServerMoneyAvailable("home") > upgradeCost){
		ns.tprint("can afford upgrade");

		// provision new server
		// kill all on old server
		// kill attack script running for old server
		// scp files to new server
		// run new attack script		

	}


}


async function getRamMultiplier(ram){

	let multi = 1;
	while(Math.pow(2,multi) < ram){
		multi++;
	}

	return multi;

}

