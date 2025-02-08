"use client"

import React, { useState } from 'react';

function SignMessage() {
  const [signature, setSignature] = useState('');
  const [account, setAccount] = useState('');

  const signMessage = async () => {

    const {ethereum} = window;
    try {
      if (!ethereum) {
        alert('Please install MetaMask or another Web3 wallet provider.');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      const message = 'Hello, this is a test message to sign for Quiz Web3';

      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, accounts[0]],
      });

      setSignature(signature);
      console.log('Signature:', signature);
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  return (
    <div>
      <button onClick={signMessage}>Sign Message</button>
      {signature && (
        <div>
          <p>Message Signed by: {account}</p>
          <p>Signature: {signature}</p>
        </div>
      )}
    </div>
  );
}

export default SignMessage;
