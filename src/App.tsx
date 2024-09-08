import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import NavBar from "./components/NavBar";
import AirDrop from "./components/AirDrop";
import Dashboard from "./components/Dashboard";

const App = () => {
  const endpoint =
    "https://solana-devnet.g.alchemy.com/v2/VyVawzJyVj8hThqvh2XxUIxJ1drDHbb5";
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="h-screen flex flex-col bg-slate-900">
            <NavBar />
            {/* <AirDrop /> */}
            <Dashboard />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
