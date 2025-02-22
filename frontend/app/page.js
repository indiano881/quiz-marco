import Image from "next/image";
import ConnectWallet from "./components/wallet";
import SignMessage from "./components/Signature";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ConnectWallet />
      <div className="bg-green-500 w-full h-4"></div>
      <SignMessage />

  
    </div>
  );
}
