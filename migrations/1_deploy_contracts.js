const { 
    SafeMathLib,
    MARXToken
} = require('../test/helpers/contractArtifacts');

const { accountsData } = require('../test/helpers/accounts');

const BN = require('bn.js');

module.exports = async function (deployer, network, accounts) {
    const [owner, pauser, recoverer, ...others] = accounts;

    // deploy and link SafeMath
    await deployer.deploy(SafeMathLib);
    await deployer.link(SafeMathLib, MARXToken);

    // // deploy USDT proxy
    await deployer.deploy(MARXToken);

    const marx = await MARXToken.deployed();

    // add backup account for MARX Pauser
    await marx.addPauser(pauser, {from: owner });

    // add backup account for MARX Recoverer
    await marx.addRecoverer(recoverer, {from: owner });

}