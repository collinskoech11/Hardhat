import Web3 from 'web3';
import {contractAbi, contractAddress } from './utils/constants';
import {useEffect, useState } from 'react';
import './App.css';


const web3 = new Web3("ws://localhost:8545")
const greeterContract = new web3.eth.Contract(contractAbi, contractAddress);

const App = () => {
  const [newGreetings, setNewGreetings] = useState("");
  const [greetings, setGreetings] = useState("");

  useEffect(() => async() => {
    const greetMsg = await greetMe()
    setGreetings(greetMsg);
  },[])

  const greetMe = async () => {
    const greetMsg = await greeterContract.methods.greet().call();
    return greetMsg;
  }
  const updateGreets = async () => {
    const greetMsg = await greeterContract.methods.setGreeting(newGreetings).send(
      {from: '0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0'}
    )
    setGreetings(await greetMe())
  }
  return (
    <>
    <div className="App">
    <input placeholder="New Greetings" type="text" value={newGreetings} onCHange={(e) => setNewGreetings(e.target.value)}/>
    <button onClick={() => updateGreets()}>
      Update Greetings
    </button>
    <h2>Current Greetings:
      <span style={{color: "blueviolet"}}>
        {greetings}
      </span>
    </h2>
    </div>
    </>
  );
}

export default App;
