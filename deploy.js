const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "this mosquito supply artwork group update poem portion olive diesel lounge cargo",
  "https://rinkeby.infura.io/v3/93829efea865445699e45a91e2431d61"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there, published!"] })
    .send({ gas: 1000000, from: accounts[0] });

  console.log("Contract Deployed To: ", result.options.address);
  provider.engine.stop();
};

deploy();