/** @param {NS} ns **/

import { openPorts } from "open-ports.js"

export async function main(ns) {  

  for(const h of ns.scan(ns.args[0])){
    openPorts(ns,h);
  }

}