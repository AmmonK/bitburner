/** @param {NS} ns **/
import { serverDetails } from 'server-details';

export async function main(ns){
  let result = openPorts(ns,ns.args[0]);
  ns.tprint(result);
  return result;
}

export async function openPorts(ns,host) {  

  ns.tprint(host);

  let details = await serverDetails(ns,host);

  if(!details.sshOpenPorts && ns.fileExists("BruteSSH.exe","home")){
    await ns.brutessh(host);
  }

  if(!details.ftpPortOpen && ns.fileExists("FTPCrack.exe","home")){
    await ns.ftpcrack(host);
  }

  if(!details.smtpPortOpen && ns.fileExists("relaySMTP.exe","home")){
    await ns.relaysmtp(host);
  }

  if(!details.httpPortOpen && ns.fileExists("HTTPWorm.exe","home")){
    await ns.httpworm(host)
  }

  if(!details.sqlPortOpen && ns.fileExists("SQLInject.exe","home")){
    await ns.sqlinject(host)
  }

  if(!details.hasAdminRights){
    await ns.nuke(host);
  }



}
