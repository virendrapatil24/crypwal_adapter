import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const Dashboard = () => {
  const { connection } = useConnection();
  const { publicKey, signMessage, sendTransaction } = useWallet();
  const [solBalance, setSolBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");

  const getSolBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  const signUserMessage = async () => {
    if (!publicKey) {
      alert("Wallet not connected!");
      return;
    }

    if (!signMessage) {
      alert("Wallet does not support message signing!");
      return;
    }

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert("Message signature invalid!");
      return;
    }

    setMessage("");
    alert(`Message signature: ${bs58.encode(signature)}`);
  };

  const sendSolBalance = async () => {
    if (!publicKey) {
      alert("Wallet not connected!");
      return;
    }

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: sendAmount * LAMPORTS_PER_SOL,
      })
    );

    await sendTransaction(transaction, connection);
    alert("Sent " + sendAmount + " SOL to " + recipientAddress);
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
      <div className="flex items-center py-2">
        <p className="text-white mx-4">
          Send{" "}
          <input
            id="send_amount"
            name="send_amount"
            type="number"
            placeholder="00"
            value={sendAmount}
            onChange={(e) => setSendAmount(Number(e.target.value))}
            className="w-12 mx-2 px-2 text-gray-900 placeholder:text-gray-600"
          />{" "}
          SOL to :{" "}
        </p>
        <input
          id="recipient_address"
          name="recipient_address"
          type="text"
          placeholder="Enter recipient address here"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="block w-4/12 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          className="bg-green-600 text-white font-medium py-2 px-4 mx-2 rounded hover:bg-green-700"
          onClick={sendSolBalance}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
