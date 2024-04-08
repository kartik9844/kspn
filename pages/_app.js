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
  address: "0xAe2296f39bC5d21b367d1C4BA0674e6d241dEBb3"
});


const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider   clientId="1db8c55529ce88ec116a82313ea27d39">
        <Component {...pageProps} />;

    </ThirdwebProvider>
  ); 
};


 export default App;