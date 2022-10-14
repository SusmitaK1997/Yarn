import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Web3 from 'web3';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [web3,setWeb3] = useState(null);
  const [isConnected,setIsConnected] = useState(false);
  const [address,setAddress] = useState("0x");
  const enableEthereum = ()=>{
    try {
      if(window.ethereum){
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts=>{
          setAddress(accounts[0]);
          setWeb3(new Web3(ethereum));
          setIsConnected(true);
        }).catch(console.log);
      }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      {address != '0x' && <h6>Connected Address{address}</h6>}
      {!isConnected ? <button className="enableEthereumButton" onClick={enableEthereum}>Enable Ethereum</button>
      :
      <>
          
      </>}
    </div>
  )
}
