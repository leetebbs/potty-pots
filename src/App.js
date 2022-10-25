import gif from "./images/SAS_gif.gif";
import { ethers } from "ethers";
import { ABI } from "./Abi";

async function connect() {
  try {
    if (window.ethereum) {
      const contractAddress = "0x834e06B54e64F5A94CEB9190aB18AE55A4b7Ee64";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      document.getElementById("walletAddress").innerText =
        "connected with " + accounts[0];
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const price = await contract.cost();
      const res = ethers.utils.formatEther(price);
      document.getElementById("cost").innerHTML = res + "Matic";
      const totalSupply = await contract.totalSupply();
      const supplyResult = parseInt(totalSupply);
      document.getElementById("count").innerHTML = supplyResult + "/1000";

      //document.getElementById("mint-btn").onClick = mint();//async () => {
      //   console.log("mint pressed")
      //   contract.methods.mint(accounts[0], 1).send({ from:accounts[0], value: 0.01 })
      // }
    } else {
      // alert("Please install metamask")
    }
  } catch (error) {
    console.log(error);
  }
}
connect();

async function mint() {
  if(window.ethereum){
    try {
      const contractAddress = "0x834e06B54e64F5A94CEB9190aB18AE55A4b7Ee64";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, provider, signer);
      const price = await contract.cost();
      const res = ethers.utils.formatEther(price);
      const withSigner = contract.connect(signer);
      //contract.methods.mint(accounts[0], 1).send({ from: accounts[0], value: res })
      let tx = await withSigner.mint((1) ,{value: ethers.utils.parseEther(res)})
      
      console.log(tx);
    } catch (error) {
        console.log(error)
    }
  }

}

function App() {
  const contractAddress = "0x834e06B54e64F5A94CEB9190aB18AE55A4b7Ee64";

  return (
    <div className="App">
      <div className="Container">
        <div className="Card-main">
          <img
            className="logo"
            src="https://images.cooltext.com/5625306.png"
          ></img>
          <img className="hero" src={gif}></img>
          <div className="text-box">
            <div className="minting">
              {/* <button id="minus" onClick="clickminus()" Class="increment">-</button> */}
              <button
                id="mint-btn"
                onClick={() => {
                  mint();
                }}
              >
                Mint
              </button>
              {/* <button id="plus" Class="increment">+</button> */}
            </div>
            <div className="cost">
              <p id="cost"></p>
              <p id="count"></p>
            </div>
            <div id="contract">{contractAddress}</div>
            <div className="mint-text">
              <p>Mint your Potty friend</p>
              <div id="walletAddress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
