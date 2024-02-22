import React,{useEffect,useContext,createContext} from 'react'
import {
    useAddress,
    useContract,
    useMetamask,
    useContractEvents,
    useContractWrite,
    useContractRead
} from "@thirdweb-dev/react"
import { ethers } from 'ethers';
const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const {contract} = useContract("");
    const address = useAddress();
    const connect = useMetamask();
    const certifate = "blockchain certificate "

    return(
        <StateContext.Provider value={{contract,connect,certifate,address}}>
            {children}
        </StateContext.Provider>
    );
};

export  const useStateContext = ()=> useContext(StateContext);
