import "@/styles/globals.css";
import { ChainId, ThirdwebProvider,useContract  } from "@thirdweb-dev/react";
import { StateContextProvider } from "../context";

// internal import


const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai} clientId="1db8c55529ce88ec116a82313ea27d39">
     <StateContextProvider>
        <Component {...pageProps} />;
      </StateContextProvider>
    </ThirdwebProvider>
  ); 
};

function Component() {
  const { contract, isLoading } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E");
}
 export default App;