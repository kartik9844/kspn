import React,{useEffect,useState} from 'react'
import { ethers } from 'ethers';
import { useStateContext } from '../context'; 
// import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button as BsButton } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const index = () => {

  const {contract,connect,certifate,address} = useStateContext();
  return (
    <div  className=" bg-white7self-stretch overflow-y-auto flex flex-col md:flex-row md:items-center items-start justify-start text-left text-base text-dwhite font-popins">
      <div className="relative bg-white w-[1550px] h-[80px]">
      <BsButton
         className="absolute top-[calc(50%_-_20px)] left-[calc(50%_+_515.54px)] cursor-pointer"
          variant="outline-primary"
          // onClick={onUserButtonClick}
        >
          User
        </BsButton>
        <BsButton
          className="absolute top-[calc(50%_-_20px)] left-[calc(50%_+_612.09px)] cursor-pointer"
          variant="outline-primary"
          // onClick={onAdminButtonClick}
        >
          Admin
        </BsButton>
        <BsButton
          className="absolute w-[calc(100%_-_1450px)] top-[17.4px] right-[196.84px] left-[102.16px] cursor-pointer"
          variant="outline-primary"
          // onClick={onAdminButtonClick}
        >
          certifate
        </BsButton>
        <BsButton
          className="absolute w-[calc(100%_-_1450px)] top-[17.4px] right-[11.53px] left-[232.47px] cursor-pointer"
          variant="outline-primary"
          // onClick={onAdminButtonClick}
        >
          licences
        </BsButton>
      </div>

    </div>
  )
}

export default index
