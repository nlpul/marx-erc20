const contractArtifacts = require('./contractArtifacts');
const { BN } = require('./setup');

async function setUpUnitTest (accounts) {
  const [owner, pauser, recoverer, ...others] = accounts;

  const SafeMathLib = await contractArtifacts.SafeMathLib.new();

  const libs = {
    SafeMathLib: SafeMathLib.address,
  };

  await contractArtifacts.MARXToken.link(libs);

  let MARXToken = await contractArtifacts.MARXToken.new({ from: owner });

  const contracts = {MARXToken: MARXToken};
  return { instances: contracts };
}

module.exports = {
  setUpUnitTest,
};