import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Illustration from '../images/hero-illustration.svg';
import HeroImage from '../images/hero-image.png';
// import ImageModal from '../utils/KaptchaModal';
// import Modal from "../utils/Modal";
// import ThreeDModel from '../utils/ThreeDModel';
import TerminalWindow from '../utils/TerminalWindow';
const codeString2 = "zkaptcha = ZKaptchaInterface.at(\"0xF988A798183058d830dEf45E592483E57Ef78002\"); \nfunction mint() {\n\trequire(zkaptcha.verifyCaptcha(params)); \n\t// ...\n}";
const codeString = "// implement ZKaptcha anti-bot in your smart contract\ninterface ZkaptchaInterface {\n\tfunction verifyCaptcha(\n\t\tbytes32[] memory merkleProof, address user, bytes32 _hash, bytes calldata zkProof\n\t) external view returns (bool);\n}"
    + "\n\n" + codeString2;
import SmartContractQuery from "../utils/SmartContractQuery";
// const modelPath = "../spherebot.glb"
// import zkaptchaabi from '../zkaptchaabi.json';
import captchaCollectionABI from '../captchacollection.json';
import { WalletProvider, useWallet } from "../utils/WalletContext";
import { ethers, providers } from 'ethers';


function DeveloperHero() {

    const { account, linkWallet, disconnectWallet, provider } = useWallet();

    const handleLinkWallet = async () => {
        await linkWallet();
        // perform further actions with the user's wallet account
    };
    return (

        <section className="relative">
            {/* Illustration */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
                <img src={Illustration} className="max-w-none" width="1440" height="1265" alt="Hero Illustration" />
            </div>

            {/* <ThreeDModel modelUrl={modelPath} /> */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 md:pt-40">
                    {/* Hero content */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-hkgrotesk mb-6 text-white inline-block bg-gradient-to-r from-purple-800/75 via-teal-500/75 to-purple-800/75 px-4 py-1.5 rounded-lg"
                            data-aos="fade-up"
                        >
                            Easy Integration and <br></br>Anti-Bot Reputation.
                        </h1>
                        <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">
                        Add a 4 line interface and a single require statement to use ZKaptcha in your smart contracts (deployed on Scroll).
                        </p>
                    </div>

                    <div data-aos="fade-up"
                        data-aos-delay="200">
                        <TerminalWindow codeString={codeString} language={"solidity"}></TerminalWindow>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto text-center mt-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-hkgrotesk mb-6 text-white inline-block py-1.5 rounded-lg"
                >
                    SybilRank
                </h1>
                <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">
                    SybilRank is based on an account’s past interactions with ZKaptcha.
                    SybilRank provides a score that allows dApp developers to set their own threshold for what they consider to be suspicious behavior,
                    and take appropriate actions, such as blocking or challenging users, based on that score. A score of 0 is likely a bot, while a score of 100 is very much a human
                    (built on Optimism).
                </p>
            </div>

            <div className='max-w-3xl mx-auto text-center mt-16 bg-gray-800 rounded-full' style={{ maxWidth: '30%' }}>
                <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">

                    {account ?
                        `${account.slice(0, 6)}...${account.slice(-4)}'s SybilRank:  ` :
                        'Please link your wallet.'
                    }
                    {account && <span className='text-green-300'>100</span>}
                </p>
            </div>

            <div className="max-w-3xl mx-auto text-center mt-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-hkgrotesk mb-6 text-white inline-block py-1.5 rounded-lg"
                >
                    Integrate Zkaptcha into your dApps
                </h1>
                <button
                    className="btn text-white bg-indigo-500 hover:bg-indigo-600 w-half shadow-sm group rounded-full" data-aos="fade-up" data-aos-delay="100"
                    onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeJu-kGFT8kUHVo__dQU_IB-KbF6cTab0F1pHSHe6ndtr_1ZA/viewform")}
                    target="_blank"
                >
                    Integrate Zkaptcha
                </button>
                {/* <button
                    className="btn text-white bg-indigo-500 hover:bg-indigo-600 w-half shadow-sm group rounded-full"
                    onClick={async () => {
                        const toAddress = '0x13DF5D56bAC76aaE15cfE0aEDc19D04D1522130F';
                        // // create an instance of the contract with the ABI and address
                        const captchaCollectionContract = new ethers.Contract(toAddress, captchaCollectionABI.abi, provider.getSigner());
                        // const result = captchaCollectionContract.createToken("https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/armstrong.json",
                        // [
                        //                         "0x9d5913e05fea728f85833c11432990b3fed6d9d1d46a8f8092858433bf89bc02",
                        //                         "0x523e338ce4eaa4e78c5ba665d4a4fa60745b75a79980db547edb09a7650424e1",
                        //                         "0x82e12e554b92fa50a3f131c905d0ba4e8e8cab2e44513ddc795b4ebf60ca6bdd",
                        //    ], "0x9913e4db9d1e51fb530ba665d9e874c03745aa5a211b7afdca25906328fc82c5");
                        // console.log(captchaCollectionContract);
                        // console.log(result);

                        const res = await captchaCollectionContract.tokenCounter();
                        console.log(res);
                    }}
                >
                    send tx
                </button> */}
            </div>


        </section>
    );
}

export default DeveloperHero;
