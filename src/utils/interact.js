
import Web3 from 'web3';

const contractABI = require('../token_presale_abi.json')

const web3 = new Web3("https://sepolia.drpc.org");

const contractAddress = "0x0f202Bb07b4303F9A974bD490fFAAf4035350d3C";

const tokenAddress_1 = '0xdAC17F958D2ee523a2206206994597C13D831ec7';//Etherum usdt contract address

const BN = require('bn.js');

export const getTotalRaisedAmount = async () => {
    let bnbAmount = await web3.eth.getBalance(contractAddress);
    bnbAmount = web3.utils.fromWei(bnbAmount, 'ether');
    return bnbAmount;
}

export const buyToken = async (value, selectedCurrency) => {

    const presaleContract = await new web3.eth.Contract(contractABI, contractAddress);

    value = (new BN(parseInt(value * 1000)).mul(new BN(10).pow(new BN(15))));

    console.log('------------------', value)

    // // Define the token address for USDT and ETH
    let tokenAddress;
    if (selectedCurrency === 'USDT') {
        tokenAddress = tokenAddress_1; // Replace with your actual USDT contract address
    } else if (selectedCurrency === 'ETH') {
        tokenAddress = tokenAddress_1; // Replace with your actual ETH contract address
    } else {
        return {
            success: false,
            status: "❌ Unsupported currency: " + selectedCurrency
        };
    }

    // // Set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress,
        from: window.ethereum.selectedAddress,
        'data': presaleContract.methods.buyWithUSDT().encodeABI(),
        'value': selectedCurrency === 'ETH' ? value.toString(16) : '0',
        gas: '50000', // Set an appropriate gas limit
        gasPrice: '20000000000', // Set an appropriate gas price
        'tokenAddress': tokenAddress,
    };

    //Sign transaction via Metamask
    try {

        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });

        return {
            success: true,
            status: "✅ Check out your transaction on bscscan: https://testnet.bscscan.com/tx/" + txHash
        };
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        };
    }
}
