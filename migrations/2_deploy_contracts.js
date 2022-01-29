const Poem = artifacts.require("Poem");

module.exports = function(deployer) {
  deployer.deploy(Poem);
};
