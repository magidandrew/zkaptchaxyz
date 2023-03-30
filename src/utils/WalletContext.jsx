import { createContext, useContext, useState } from 'react';
// import Web3 from 'web3';
import { ethers } from 'ethers';



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
    const [web3instance, setWeb3] = useState(null);
    const scrollNetworkUrl = 'https://alpha-rpc.scroll.io/l2'

    // another iteration, but now with ethers.
    const linkWallet = async () => {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        //   const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
          const scrollProvider = new ethers.providers.JsonRpcProvider(scrollNetworkUrl);
          console.log(scrollProvider.listAccounts());

        //   setWeb3(ethersProvider);
          const accounts = await scrollProvider.listAccounts();
          console.log(`Connected to account: ${accounts[0]}`);
          setAccount(accounts[0]);
        } catch (error) {
          console.error(error);
        }
      };

    // const linkWallet = async () => {
    //     if (window.ethereum) {
    //         const web3 = new Web3(window.ethereum);
    //         try {
    //             // Request account access
    //             await window.ethereum.request({ method: 'eth_requestAccounts' });
    //             console.log('Account access granted');

    //             // Switch to the desired network
    //             const isScrollSet = await web3.eth.net.setProvider(scrollNetworkUrl);
    //             if (isScrollSet) {
    //                 console.log(`Connected to ${scrollNetworkUrl}`);
    //             }

    //             // Use the web3 instance to interact with the Polygon network
    //             const accounts = await web3.eth.getAccounts();
    //             console.log(accounts);
    //             console.log(`Connected to account: ${accounts[0]}`);

    //             // Perform any further actions needed to interact with the Polygon network
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     } else {
    //         console.error('No Ethereum provider detected');
    //     }
    // };

    // const linkWallet = async () => {
    //     try {
    //         const web3 = new Web3('https://alpha-rpc.scroll.io/l2');
    //         // const web3 = new Web3(window.ethereum);
    //         setWeb3(web3);
    //         console.log(web3);
    //         // const accounts = await web3.eth.getAccounts();
    //         web3.
    //         console.log(accounts);
    //         console.log(`Connected to account: ${accounts[0]}`);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const disconnectWallet = () => {
        setAccount('');
        // Perform any further actions needed to disconnect the user's wallet account
    };

    return (
        <WalletContext.Provider value={{ account, linkWallet, disconnectWallet, web3instance }}>
            {children}
        </WalletContext.Provider>
    );
};
