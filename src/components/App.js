import * as React from 'react';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Poem from '../abis/Poem.json'
import Main from './Main'

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

function App() {
  const [account, setAccount] = React.useState(undefined);
  const [poem, setPoem] = React.useState(undefined);
  const [lines, setLines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = Poem.networks[networkId]
    if(networkData) {
      const poem = web3.eth.Contract(Poem.abi, networkData.address)
      setPoem(poem);
      const lineCount = await poem.methods.lineCount().call()
      // Load lines
      const loadedLines = [];
      for (var i = 1; i <= lineCount; i++) {
        const line = await poem.methods.lines(i).call();
        loadedLines.push(line);
      }
      setLines(loadedLines);
      setLoading(false);
    } else {
      window.alert('Poem contract not deployed to detected network.')
    }
  }

  const addLine = React.useCallback((content) => {
    setLoading(true);
    poem.methods.addLine(content).send({ from: account })
    .on('confirmation', (confNumber, receipt) => {
      console.log("conf back", confNumber, receipt);
      setLoading(false);
    })
  }, []);

  return (
    <div>
      <Navbar account={account}  />
      <div style={{paddingTop: 96}}>
        { loading
          ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
          : <Main lines={lines} addLine={addLine} />
        }
      </div>
    </div>
  );
}

export default App;
