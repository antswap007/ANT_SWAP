import booToken from "./BooToken.json";
import lifeToken from "./LifeToken.json";
import singleSwapToken from "./SingleSwapToken.json";
import swapMultiHop from "./SwapMultiHop.json";
import IWETH from "./IWETH.json";


//BOOTOKEN
export const BooTokenAddress = "0x805B2fd02C3F10d618404DF89031dFdA29931bE1";
export const BooTokenABI = booToken.abi;

//LIFE TOken
export const LifeTokenAddress = "0x48EEa5cdE1eF112747FC0B84078A673803ce9170";
export const LifeTokenABI = lifeToken.abi;

//SINGLE SWAP TOKEN
export const SingleSwapTokenAddress =
  "0x811a15F69c49d8514Ce4B4FEe70771B82Ea76943";
export const SingleSwapTokenABI = singleSwapToken.abi;

// SWAP MULTIHOP
export const SwapMultiHopAddress = "0x7E954ED41beEb46629600948e8e7a16789214885";
export const SwapMultiHopABI = swapMultiHop.abi;

//IWETH
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;
