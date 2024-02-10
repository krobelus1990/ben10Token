import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import React from "react";
import HomePage from "./components/home";
import Header from "./components/header";
import AboutPage from "./components/about";
import HowToBuyPage from "./components/howToBuy";
import TokenomicsPage from "./components/tokenomics";
import RoadmapPage from "./components/roadmap";
import ContactPage from "./components/contact";
import FooterPage from "./components/footer";
import Loader from "./components/Loader";
import Airdrop from "./components/airdrop";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  coinbaseWallet,
  okxWallet,
  ledgerWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import ReactAudioPlayer from 'react-audio-player';
import { ALCHEMY_API_KEY, PROJECT_ID } from "./utils/env";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, goerli],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    publicProvider()
  ]
);

const projectId = PROJECT_ID;

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }), // Metamask
      ...(projectId ? [walletConnectWallet({ projectId, chains })] : []),
      ...(projectId ? [trustWallet({ projectId, chains })] : []),
      // walletConnectWallet({ projectId, chains }),
      // trustWallet({ projectId, chains }),
      // Add more recommended wallets as needed
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      ...(projectId ? [rainbowWallet({ projectId, chains })] : []),
      ...(projectId ? [coinbaseWallet({ projectId, chains })] : []),
      ...(projectId ? [okxWallet({ projectId, chains })] : []),
      ...(projectId ? [ledgerWallet({ projectId, chains })] : []),

      // rainbowWallet({ projectId, chains }),
      // coinbaseWallet({ projectId, chains }),
      // okxWallet({ projectId, chains }),
      // ledgerWallet({ projectId, chains }),
      // Add other wallets to the "Other" group
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const App = () => {

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };
  
    window.addEventListener('load', handleLoad);
  
    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return isLoading ? <Loader /> : (
    <>
      <ReactAudioPlayer
        src="/audio/mix.mp3"
        autoPlay
        type="audio/mp3"
        title="audio"
      />

      <WagmiConfig config={wagmiConfig}>

        <RainbowKitProvider chains={chains} coolMode theme={darkTheme()}>
          <BrowserRouter>
            <Header />
            <div className="relative bg-[#64cc4f]">

              <HomePage />

              <AboutPage />

              <HowToBuyPage />

              <TokenomicsPage />

              <RoadmapPage />

            </div>

            <div className="relative bg-[#64cc4f]">

              <ContactPage />

            </div>
            <div className="relative bg-[#328336]">

              <FooterPage />

            </div>
            <Routes path="/airdrop" element={<Airdrop />}></Routes>
          </BrowserRouter>

        </RainbowKitProvider>

      </WagmiConfig>

    </>
  )
}

export default App
