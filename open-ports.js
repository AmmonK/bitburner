/** @param {NS} ns **/
export async function openPorts(ns,host) {  
  if(host == "darkweb") return;
  if(host.includes("bot-")) return;

  ns.tprint(host);
  const numPorts = ns.getServerNumPortsRequired(host);
  ns.tprint("ports needed: ",numPorts);

  if(numPorts >= 1) {
    if(ns.fileExists("BruteSSH.exe","home"))
	{
	  ns.tprint("→SSH:[",ns.brutessh(host)?"O":"C","]");
	}
  }
  if(numPorts >= 2) {
    if(ns.fileExists("FTPCrack.exe","home")){
	  ns.tprint("→FTP:[",ns.ftpcrack(host)?"O":"C","]");
	}
  }
  if(numPorts >= 3) {
    if(ns.fileExists("relaySMTP.exe","home")){
      ns.tprint("→FTP:[",ns.relaysmtp(host)?"O":"C","]");
    }
  }
  if(numPorts >= 4) {
    if(ns.fileExists("HTTPWorm.exe","home")){
      ns.tprint("→HTTP:[",ns.httpworm(host)?"O":"C","]");
    }
  }
  if(numPorts >= 5) {
    if(ns.fileExists("SQLInject.exe","home")){
      ns.tprint("→SQL:[",ns.sqlinject(host)?"O":"C","]");
    }
  }
  if(!ns.hasRootAccess(host)) {
    ns.tprint("→NUKE:[",ns.nuke(host)?"O":"C","]");
  }
  ns.tprint("→BACKDOOR:[",ns.exec("backdoor",host),"]");	
}