/** @param {NS} ns **/
import { openPorts } from "open-ports.ns"

export async function main(ns) {  

  const host = ns.args[0];

  openPorts(ns,host);  
  await ns.exec("purchase-server.script", "home",1,"bot-"+host,256);
  await ns.sleep(3000);
  await ns.exec("setup-server.ns","home",1,host);
}