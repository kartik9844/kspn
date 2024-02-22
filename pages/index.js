import React,{useEffect,useState} from 'react'
import { ethers } from 'ethers';
import { useStateContext } from '../context'; 

export const index = () => {

  const {contract,connect,certifate,address} = useStateContext();
  return (
    <div>
      <h1>{certifate}</h1>
      <button onClick={() => connect()}>Connect</button>
      <p>{address}</p>
    </div>
  )
}

export default index
