import React,{useEffect,useState} from 'react'
import { ethers } from 'ethers';
import { useStateContext } from '../context'; 
// import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Homenav from './components/homenav';
import Homebody from './components/homebody';

export const index = () => {

  const { contract, connect, certifate, address } = useStateContext();
  return (
    <div className="font-poppins bg-white" >
      <Homenav />
      <Homebody />
    </div>
  )
}

export default index
