import "@/styles/globals.css";
import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import { polygonAmoy } from "thirdweb/chains";
// import { StateContextProvider } from "../context";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({ 
  clientId: "1db8c55529ce88ec116a82313ea27d39" 
});

// connect to your contract
export const contract = getContract({ 
  client, 
  chain: polygonAmoy, 
  address: "0xC89102594357E385d8a183a6809114a6518429Ea"
});

export const contract1 = getContract({ 
  client, 
  chain: polygonAmoy, 
  address: "0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E"
});


const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider   clientId="1db8c55529ce88ec116a82313ea27d39">
        <Component {...pageProps} />;

    </ThirdwebProvider>
  ); 
};


 export default App;