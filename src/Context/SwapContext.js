import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import axios from "axios";

//INTERNAL IMPORT
import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithBooToken,
  connectingWithLIfeToken,
  connectingWithSingleSwapToken,
  connectingWithIWTHToken,
  connectingWithDAIToken,
  connectingWithUserStorageContract,
  connectingWithMultiHopContract,
} from "../Utils/appFeatures";

import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice } from "../Utils/swapUpdatePrice";
import { addLiquidityExternal } from "../Utils/addLiquidity";
import { getLiquidityData } from "../Utils/checkLiquidity";
import { connectingWithPoolContract } from "../Utils/deployPool";

import { IWETHABI } from "./constants";
// import ERC20 from "./ERC20.json";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  //USSTATE
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");

  const [tokenData, setTokenData] = useState([]);
//   const [getAllLiquidity, setGetAllLiquidity] = useState([]);
  //TOP TOKENS
//   const [topTokensList, setTopTokensList] = useState([]);

  const addToken = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x805B2fd02C3F10d618404DF89031dFdA29931bE1",
    "0x48EEa5cdE1eF112747FC0B84078A673803ce9170",
  ];

  //FETCH DATA
  const fetchingData = async () => {
    try {
      //GET USER ACCOUNT
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);
      //CREATE PROVIDER
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      //CHECK Balance
      const balance = await provider.getBalance(userAccount);
  

      const convertBal = BigNumber.from(balance);
      const ethValue = ethers.utils.formatEther(convertBal);
      setEther(ethValue);

    //   //GET NETWORK
    //   const newtork = await provider.getNetwork();
    //   setNetworkConnect(newtork.name);

      //ALL TOKEN BALANCE AND DATA
      addToken.map(async (el, i) => {
        //GETTING CONTRACT
        const contract = new ethers.Contract(el, ERC20, provider);
        //GETTING BALANCE OF TOKEN
        const userBalance = await contract.balanceOf(userAccount);
        // console.log(balance);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);
        //GET NAME AND SYMBOL
        console.log(userBalance);
        // const symbol = await contract.symbol();
        // const name = await contract.name();

        // tokenData.push({
        //   name: name,
        //   symbol: symbol,
        //   tokenBalance: convertTokenBal,
        //   tokenAddress: el,
        // });
      });

//       // //GET LIQUDITY
//       const userStorageData = await connectingWithUserStorageContract();
//       const userLiquidity = await userStorageData.getAllTransactions();
//       console.log(userLiquidity);

//       userLiquidity.map(async (el, i) => {
//         const liquidityData = await getLiquidityData(
//           el.poolAddress,
//           el.tokenAddress0,
//           el.tokenAddress1
//         );

//         getAllLiquidity.push(liquidityData);
//         console.log(getAllLiquidity);
//       });

//       const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

//       const query = `
//       {
//         tokens(orderBy: volumeUSD, orderDirection: desc, first:20){
//           id
//           name
//           symbol
//            decimals
//           volume
//           volumeUSD
//            totalSupply
//            feesUSD
//            txCount
//            poolCount
//            totalValueLockedUSD
//            totalValueLocked
//            derivedETH
//         }
//       }
//       `;

//       const axiosData = await axios.post(URL, { query: query });
//       console.log(axiosData.data.data.tokens);
//       setTopTokensList(axiosData.data.data.tokens);
    } catch (error) {
      console.log(error);
    }
  };

//   useEffect(() => {
//     fetchingData();
//   }, []);

//   //CREATE AND ADD LIQUIDITY
//   const createLiquidityAndPool = async ({
//     tokenAddress0,
//     tokenAddress1,
//     fee,
//     tokenPrice1,
//     tokenPrice2,
//     slippage,
//     deadline,
//     tokenAmmountOne,
//     tokenAmmountTwo,
//   }) => {
//     try {
//       console.log(
//         tokenAddress0,
//         tokenAddress1,
//         fee,
//         tokenPrice1,
//         tokenPrice2,
//         slippage,
//         deadline,
//         tokenAmmountOne,
//         tokenAmmountTwo
//       );
//       //CREATE POOL
//       const createPool = await connectingWithPoolContract(
//         tokenAddress0,
//         tokenAddress1,
//         fee,
//         tokenPrice1,
//         tokenPrice2,
//         {
//           gasLimit: 500000,
//         }
//       );

//       const poolAddress = createPool;
//       console.log(poolAddress);

//       //CREATE LIQUIDITY
//       const info = await addLiquidityExternal(
//         tokenAddress0,
//         tokenAddress1,
//         poolAddress,
//         fee,
//         tokenAmmountOne,
//         tokenAmmountTwo
//       );
//       console.log(info);

//       //ADD DATA
//       const userStorageData = await connectingWithUserStorageContract();

//       const userLiqudity = await userStorageData.addToBlockchain(
//         poolAddress,
//         tokenAddress0,
//         tokenAddress1
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //SINGL SWAP TOKEN
//   const singleSwapToken = async ({ token1, token2, swapAmount }) => {
//     console.log(
//       token1.tokenAddress.tokenAddress,
//       token2.tokenAddress.tokenAddress,
//       swapAmount
//     );
//     try {
//       let singleSwapToken;
//       let weth;
//       let dai;
//       singleSwapToken = await connectingWithSingleSwapToken();
//       weth = await connectingWithIWTHToken();
//       dai = await connectingWithDAIToken();

//       console.log(singleSwapToken);
//       const decimals0 = 18;
//       const inputAmount = swapAmount;
//       const amountIn = ethers.utils.parseUnits(
//         inputAmount.toString(),
//         decimals0
//       );

//       await weth.deposit({ value: amountIn });
//       console.log(amountIn);
//       await weth.approve(singleSwapToken.address, amountIn);
//       //SWAP
//       const transaction = await singleSwapToken.swapExactInputSingle(
//         token1.tokenAddress.tokenAddress,
//         token2.tokenAddress.tokenAddress,
//         amountIn,
//         {
//           gasLimit: 300000,
//         }
//       );
//       await transaction.wait();
//       console.log(transaction);
//       const balance = await dai.balanceOf(account);
//       const transferAmount = BigNumber.from(balance).toString();
//       const ethValue = ethers.utils.formatEther(transferAmount);
//       setDai(ethValue);
//       console.log("DAI balance:", ethValue);
//     } catch (error) {
//       console.log(error);
//     }
//   };
useEffect(()=>{
    fetchingData();
},[])
const swap="njjjj";
  return (
    <SwapTokenContext.Provider
      value={{
        swap
        // singleSwapToken,
        // connectWallet,
        // getPrice,
        // swapUpdatePrice,
        // createLiquidityAndPool,
        // getAllLiquidity,
        // account,
        // weth9,
        // dai,
        // networkConnect,
        // ether,
        // tokenData,
        // topTokensList,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
