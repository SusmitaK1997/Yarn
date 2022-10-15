import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Web3 from 'web3';
import { Contract_ABI } from '../ABI/Contract';
import styles from '../styles/Home.module.css'


const contractAddress = '0xBF11F50BB43c31ae61f306777E8208B0eD62F099';

export default function Home() {
  const [web3,setWeb3] = useState(null);
  const [isConnected,setIsConnected] = useState(false);
  const [address,setAddress] = useState("0x");
  const [Info,setInfo] = useState(null);
  const [Name,setName] = useState();
  const [persona,setPersona] = useState();
  const [company,setCompany] = useState();
  const [isAdmin,setIsAdmin] = useState(false);
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
  

  const getData=async ()=>{

    let SampleContract = new web3.eth.Contract(Contract_ABI,contractAddress);
    //console.log(SampleContract);
    let data = await SampleContract.methods.getData().call();
    setInfo(data);
    console.log(data);
  }
  const setData= async ()=>{
    let SampleContract = new web3.eth.Contract(Contract_ABI,contractAddress);
    let data = await SampleContract.methods.writeData(Name,persona,company,isAdmin).send({from:address,value:'0'});
    
    
  }

  return (
    <div className={styles.container}>
      {address != '0x' && <h6>Connected Address{address}</h6>}
      {!isConnected ? <button className="enableEthereumButton" onClick={enableEthereum}>Enable Ethereum</button>
      :
      <>
      {Info &&<div className="contractInteraction">
          <h5>Name: {Info[0]}</h5>
          <h5>Persona: {Info[1]}</h5>
          <h5>Company: {Info[2]}</h5>
          <h5>IsAdmin: {Info[3].toString()}</h5>
        </div>}
      <div>
        <button className="InteractButton"onClick= {getData}>Get Data</button>
      </div>
      <div className="contractInteraction">
        <h5>Name: <input type="text" value={Name} onChange={e=>{setName(e.target.value)}}/></h5>
        <h5>Persona: <input type="text" value={persona} onChange={e=>{setPersona(e.target.value)}}/></h5>
        <h5>Company: <input type="text" value={company} onChange={e=>{setCompany(e.target.value)}}/></h5>
        <h5>IsAdmin: <input type="checkbox" value={isAdmin} onChange={e=>{setIsAdmin(e.target.value)}}/></h5>
      </div>
      <div>
        <button className="InteractButton" onClick ={setData}> Data</button>
      </div>
  </>
          
  }
    </div>
  )
}
