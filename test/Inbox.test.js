const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
const INITIAL_STRING = "Hi There"

let accounts;
let inbox;
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use on of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi There"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("Deploys Contract", () => {
    assert.ok(inbox.options.address);
  });
  it("Has a default message", async () => {
    const message = await inbox.methods.message().call();
    await assert.equal(message, INITIAL_STRING);
  });
  it("Can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0], gas: "1000000" });;
    const message = await inbox.methods.message().call();
    await assert.equal(message, "bye");
  });
});
