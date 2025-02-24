import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {ethers} from 'ethers' ;

const app = express()
const port = 3001;


// middleware if needed
app.use(cors());
app.use(bodyParser.json());

app.get('/:address', (req, res) => {

    const { address } = req.params;
    res.json({address})
    //here need to add logic to check that adress in backend and the one in frontend are the same?
  });

app.get('/verify/:address', (req, res) => {
  const { response, status } = verify(req)

  res.status(status).json(response)
})

app.get('/', (req, res)=> {
    res.send('Hello World!')
})



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });