import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";

const AirDrop = () => {
  const { connection } = useConnection();
  const [publicKey, setPublicKey] = useState("");
  const [amount, setAmount] = useState(0);

  const sendAirdropToUser = async () => {
    try {
      const validatedPublicKey = new PublicKey(publicKey);
      if (amount < 1 || amount > 5) {
        alert("Please enter a value between 0 to 5");
        return;
      }
      const lamports = amount * 1e9;
      await connection.requestAirdrop(validatedPublicKey, lamports);

      alert(`Airdrop successful!`);
    } catch (error) {
      console.error("Airdrop failed", error);
      alert("Failed to send SOL");
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center gap-5 bg-slate-900">
        <p className="text-4xl text-white">🌟💧 Sol AirDrop 💧🌟</p>
        <p className="text-2xl text-white">
          Fuel your Solana experience! The ultimate faucet for Solana's Devnet
          and Testnet.
        </p>
        <p className="text-2xl text-red-500">
          Disclaimer: This tool does NOT provide real $SOL or Solana tokens.
        </p>
        <input
          id="solana_wallet_address"
          name="solana_wallet_address"
          type="text"
          placeholder="Enter your Solana wallet address..."
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          className="block w-4/12 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p className="text-xl text-blue-500">
          Airdrop
          <input
            id="airdrop_value"
            name="airdrop_value"
            type="number"
            placeholder="00"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-12 mx-2 px-2"
          />
          to
          <button
            className="bg-green-600 text-white font-medium py-2 px-4 mx-2 rounded hover:bg-green-700"
            onClick={sendAirdropToUser}
          >
            DevNet
          </button>
        </p>
      </div>
    </>
  );
};

export default AirDrop;
