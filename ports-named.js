/** @param {NS} ns **/
import { openPorts } from "open-ports.js"

export async function main(ns) {  

  const host = ns.args[0];

  openPorts(ns,host);

}