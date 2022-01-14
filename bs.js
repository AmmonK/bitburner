/** @param {NS} ns **/
import { openPorts } from "open-ports.js"

export async function main(ns) {

  const host = ns.args[0];
  const hostRam = ns.args[1];

  openPorts(ns, host);
  await ns.exec("purchase-server.js", "home", 1, "bot-" + host, hostRam);
  await ns.sleep(3000);
  await ns.exec("setup-server.js", "home", 1, host);
}