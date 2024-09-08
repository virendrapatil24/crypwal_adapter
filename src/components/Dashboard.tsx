import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Dashboard = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [solBalance, setSolBalance] = useState(0);

  const getSolBalance = async () => {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  getSolBalance();

  return (
    <div className="flex-1 flex flex-col mx-20">
      <div className="flex items-center py-2">
        <p className="text-white mx-4">Connect your Wallet: </p>
        <WalletMultiButton />
        <p className="text-white mx-4">Disconnect your Wallet: </p>
        <WalletDisconnectButton />
      </div>
      <div className="flex items-center py-2">
        <p className="text-green-400 mx-4">
          Current Wallet Balance: {solBalance} SOL
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
