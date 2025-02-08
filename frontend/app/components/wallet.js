"use client"

import React, { useState } from 'react';

function ConnectWallet() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
        const {ethereum} = window;

        if (ethereum) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            console.log('Connected account:', accounts[0]);
            
        } else {
            alert('Please install MetaMask or another Web3 wallet provider.');
        }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected account: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ConnectWallet;