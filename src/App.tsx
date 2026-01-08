import { useState } from "react";
import { ethers } from "ethers";
function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const [address] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(address);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balanceBigInt = await provider.getBalance(address);
        const balanceInEth = ethers.formatEther(balanceBigInt);
        setBalance(balanceInEth);
      } catch (err) {
        console.error("Errore nella connessione al wallet:", err);
      }
    } else {
      alert("MetaMask non installato");
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Leggi il tuo saldo ETH</h1>
      <button onClick={connectWallet}>Connetti Wallet</button>
      {walletAddress && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Wallet:</strong> {walletAddress}
          </p>
          <p>
            <strong>Saldo:</strong> {balance} ETH
          </p>
        </div>
      )}
    </div>
  );
}
export default App;
