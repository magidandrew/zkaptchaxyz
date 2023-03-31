import { createContext, useContext, useState } from 'react';
import { ethers, providers } from 'ethers';
// import Web3 from 'web3';

const WalletContext = createContext();

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState('');
    const [provider, setProvider] = useState(null);
    const scrollNetworkUrl = 'https://alpha-rpc.scroll.io/l2';
    // const polygonNetworkUrl = 'https://polygon-mumbai.infura.io/v3/748ad11fcda7473dacdafd5fa572a5ba';
    let scrollChainId = null;
    let currentChainId = null;

    // another iteration, but now with ethers.
    const linkWallet = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const scrollProvider = new ethers.providers.JsonRpcProvider(scrollNetworkUrl);

            // Prompt the user to connect their MetaMask wallet
            await provider.send("eth_requestAccounts", []);

            // set scroll chainid
            await scrollProvider.getNetwork().then((network) => {
                scrollChainId = network.chainId;
                console.log("Scroll Chain ID:", scrollChainId);
            }).catch((error) => {
                console.error("Error getting chain ID:", error);
            });

            // set current chainid
            await provider.getNetwork().then((network) => {
                currentChainId = network.chainId;
                console.log("My chain ID:", currentChainId);
            }).catch((error) => {
                console.error("Error getting chain ID:", error);
            });

            // Define the network you want to switch to
            const newNetwork = {
                chainId: ethers.utils.hexStripZeros(ethers.utils.hexlify(scrollChainId)), // Main Ethereum network
                chainName: "Scroll Alpha Testnet",
                nativeCurrency: {
                    name: "Ether",
                    symbol: "ETH",
                    decimals: 18,
                },
                rpcUrls: [scrollNetworkUrl],
                blockExplorerUrls: ["https://blockscout.scroll.io/"],
            };

            // Check if the user is already connected to the desired network
            if (currentChainId != scrollChainId) {
                // Switch to the desired network
                await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [newNetwork],
                });
            }

            //   setWeb3(ethersProvider);
            const accounts = await provider.listAccounts();
            console.log(`Connected to account: ${accounts[0]}`);
            setAccount(accounts[0]);
            setProvider(provider);



        } catch (error) {
            console.error(error);
        }
    };

    const disconnectWallet = () => {
        setAccount('');
        setProvider(null);
        // Perform any further actions needed to disconnect the user's wallet account
    };

    return (
        <WalletContext.Provider value={{ account, linkWallet, disconnectWallet, provider}}>
            {children}
        </WalletContext.Provider>
    );
};
