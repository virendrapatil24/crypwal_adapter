import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Dashboard = () => {
  const { connection } = useConnection();
  const { publicKey, signMessage } = useWallet();
  const [solBalance, setSolBalance] = useState(0);
  const [message, setMessage] = useState("");

  const getSolBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  getSolBalance();

  const signUserMessage = async () => {
    if (!publicKey) alert("Wallet not connected!");
    if (!signMessage) alert("Wallet does not support message signing!");

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      alert("Message signature invalid!");

    alert(`Message signature: ${bs58.encode(signature)}`);
  };

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
      <div className="flex items-center py-2">
        <p className="text-white mx-4">Sign your Message: </p>
        <input
          id="sign_message"
          name="sign_message"
          type="text"
          placeholder="Enter your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-4/12 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          className="bg-green-600 text-white font-medium py-2 px-4 mx-2 rounded hover:bg-green-700"
          onClick={signUserMessage}
        >
          Sign
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
