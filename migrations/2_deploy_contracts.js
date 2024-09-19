const Poll = artifacts.require("Poll");

module.exports = function (deployer) {
  const question = "What is your favorite programming language?";

  // Deploy the contract with only the question
  deployer.deploy(Poll, question).then(async (instance) => {
    console.log("Contract deployed at:", instance.address);

    // After deployment, use the instance to add options
    await instance.addOption("JavaScript");
    await instance.addOption("Python");
    await instance.addOption("Solidity");
  });
};
