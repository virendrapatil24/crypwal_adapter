import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const Dashboard = () => {
  return (
    <div>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  );
};

export default Dashboard;
