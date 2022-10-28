import gif from "./images/SAS_gif.gif";
import { ethers } from "ethers";
import { ABI } from "./Abi";
import logo from "./images/logon.png";
import { useState } from "react";

function App() {
  const contractAddress = "0x834e06B54e64F5A94CEB9190aB18AE55A4b7Ee64";

  const [amount, setAmount] = useState(1);

  function increment() {
    setAmount(amount + 1);
    if (amount > 19) {
      document.getElementById("warning").innerText =
        "20 is the max mint amount";
      setAmount(20);
    } else {
      document.getElementById("warning").innerText = "";
    }
    console.log(amount);
  }

  function decrement() {
    setAmount(amount - 1);
    if (amount <= 1) {
      setAmount(1);
    }
    if (amount < 21) {
      document.getElementById("warning").innerText = "";
    }
    console.log(amount);
  }

  async function connect() {
    try {
      if (window.ethereum) {
        const contractAddress = "0x834e06B54e64F5A94CEB9190aB18AE55A4b7Ee64";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const price = await contract.cost();
        const res = ethers.utils.formatEther(price);
        document.getElementById("cost").innerHTML = "Price: " + res + "Matic";
        const totalSupply = await contract.totalSupply();
        const supplyResult = parseInt(totalSupply);
        document.getElementById("count").innerHTML =
          supplyResult + "/1000 Minted";
      } else {
        document.getElementById("cost").innerText = "Please install metamask";
      }
    } catch (error) {
      console.log(error);
    }
  }
  connect();

  async function mint() {
    if (window.ethereum) {
      try {
        const contractAddress = "0x834e06B54e64F5A94CEB9190aB18AE55A4b7Ee64";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          ABI,
          provider,
          signer
        );
        const price = await contract.cost();
        const res = ethers.utils.formatEther(price);
        const result = amount * res;
        const payment = result.toString();
        const withSigner = contract.connect(signer);
        let tx = await withSigner.mint(amount, {
          value: ethers.utils.parseEther(payment),
        });
        document.getElementById("warning").innerText =
          "Congratulaions you have minted " + amount + " Pots.";

        console.log(tx);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="App">
      <div className="Container">
        <div className="Card-main">
          <img className="logo" src={logo}></img>
          <img className="hero" src={gif}></img>
          <div id="warning"></div>
          <div className="text-box">
            <div className="minting">
              <button
                id="minus"
                onClick={() => {
                  decrement();
                }}
                ClassName="decrement"
              >
                -
              </button>
              <button
                id="mint-btn"
                onClick={() => {
                  mint();
                }}
              >
                Mint {amount}
              </button>
              <button
                id="minus"
                onClick={() => {
                  increment();
                }}
                ClassName="increment"
              >
                +
              </button>
            </div>
            <div className="cost">
              <p id="cost"></p>
              <p id="count"></p>
            </div>
            <div id="contract">
              <p>Contract Address</p>
              <p>{contractAddress}</p>
            </div>
            <div className="mint-text">
              <p>Mint your own Potty friends</p>
            </div>
          </div>
          <div id="walletAddress"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
