import "@/styles/globals.css";
import { ChainId, ThirdwebProvider  } from "@thirdweb-dev/react";
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

 export default App;