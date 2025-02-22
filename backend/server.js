import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {ethers} from 'ethers' ;

const app=express()
const port = 3001;
const nonces= {};

// middleware if needed
app.use(cors());
app.use(bodyParser.json());

app.get('/nonce/:address', (req, res) => {

    const { address } = req.params;
    const nonce = Math.floor(Math.random() * 1000000).toString();
    nonces[address.toLowerCase()] = nonce;
    res.json({ nonce });
    console.log(nonces[address.toLowerCase()])
    console.log('NONCE'+ nonce)
    console.log( nonces)
  });
app.post('/verify/', (req, res)=> {
    try {
        const {address, signature}= req.body
        if (!address || !signature) {
            return res.status(400).json({ error: 'Missing address or signature' });
          }
          const storedNonce = nonces[address.toLowerCase()];
    if (!storedNonce) {
      return res.status(400).json({ error: 'No nonce for this address. Request a new nonce.' });
    }
    
    const message = `I am signing my one-time nonce: ${storedNonce}`;

   
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

 
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      //remove the nonce from memory once used to prevent replay attacks
      delete nonces[address.toLowerCase()];

     
      return res.json({
        success: true,
        verifiedAddress: recoveredAddress,
      });
    } else {
      
      return res.status(401).json({
        success: false,
        error: 'Signature verification failed',
      });
    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Internal ERRor'
        })
    }
})
app.get('/', (req, res)=> {
    res.send('Hello World!')
})



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });