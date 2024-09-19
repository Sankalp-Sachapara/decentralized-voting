import React, {useState, useEffect}  from "react";
import Web3 from "web3";


function App() {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const connectWallet = async () => {
    if(window.ethereum) {
      const web3 = new Web3(window.ethereum);

      try{
        await window.ethereum.request({method: "eth_requestAccounts"});

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
      catch (error) {
        setErrorMessage("User denied account access or something went wrong");
      }
    }
    else{
      setErrorMessage("Please install MetaMask to use this")
    }
  };

  useEffect(()=> {
    if(window.ethereum) {
      window.ethereum.request({method: "eth_accounts"}).then((accounts) => {
        if(accounts.length > 0){
          setAccount(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <h1>Decentralized Voting Platform</h1>
      {account ? (
        <>
          <h2> Connected Account: {account}</h2>
        </>
      ): (
        <div>
          <button onClick={connectWallet}>ConnectWallet</button>
          {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
        </div>
      )}
      
    </div>
  );
}

export default App;
