import { createCoin, CreateCoinArgs, getCoin, validateMetadataURIContent, ValidMetadataURI } from "@zoralabs/coins-sdk";
import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, baseSepolia } from "viem/chains";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const RPC_URL = process.env.RPC_URL;


// Andy
const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

// Bob
// const account = privateKeyToAccount("0xb454029eda048ef542a8bb41a4abe628eeaaf9bddd4721b940d34db39d6fe77c");

// const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

console.log("Account address:", account.address);

// const publicClient = createPublicClient({
//   chain: base,
//   transport: http(),
// });

// const walletClient = createWalletClient({
//   account: account,
//   chain: base,
//   transport: http(),
// });

const publicClient = createPublicClient( { chain: base, transport: http() } )
const walletClient = createWalletClient({  account: account, chain: base, transport: http() })

// var publicClient = createPublicClient( { chain: base, transport: http() } );

// var walletClient = createWalletClient({  account: account, chain: base, transport: http() })

const coinParams: CreateCoinArgs = {
  name: "Eagle2",
  symbol: "EGL2",
  uri: "ipfs://bafybeib7b7merj544rvk26ne4yz5xltars2nm3is7jpau4cmfjovcq4yjy",
  payoutRecipient: account.address,
}

async function main() {
  try {
    const result = await createCoin(coinParams, walletClient, publicClient);
    console.log("Transaction hash:", result.hash);
    console.log("Coin address:", result.address);
    console.log("Deployment details:", result.deployment);
  } catch (e) {
    console.error(e);
  }
}

main().then().catch(()=>"error");
