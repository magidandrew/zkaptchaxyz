import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Illustration from '../images/hero-illustration.svg';
import HeroImage from '../images/hero-image.png';
// import ImageModal from '../utils/KaptchaModal';
import Modal from "../utils/Modal";
// import ThreeDModel from '../utils/ThreeDModel';
import TerminalWindow from '../utils/TerminalWindow';
const codeString = "// implement ZKaptcha anti-bot in your smart contract\nzkaptcha = ZKaptchaInterface.at(\"0cnkjrng30tgn\"); \nfunction mint() {\n\tassert(verify.verifyCaptcha(params)); \n\t// ...\n}";
import Web3 from 'web3';
import captchacollection from "../CaptchaCollection.json";
import { WalletProvider, useWallet } from "../utils/WalletContext";
import { Fragment } from 'react';
import Features from './Features';
import IconList from './IconList';
import Features02 from './Features02';






function UserHero() {

  const { account, linkWallet, existingweb3 } = useWallet();

  const handleLinkWallet = async () => {
    await linkWallet();
    // perform further actions with the user's wallet account
  };


  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [checked, setCheck] = useState(false);
  const [proofCreated, createProof] = useState(false);
  const inputRef = useRef(null);
  const [mintResult, setMintResult] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (mintResult) {
      setTimeout(() => {
        setShowButton(true);
      }, 3000);
    }
  }, [mintResult]);

  var mp = null;


  const mintNft = async () => {
    console.log(existingweb3);
    console.log("acocunt " + account);
    console.log("merkle proof: " + mp);
    console.log("input: " + inputRef.current.value);
    const input = inputRef.current.value;

    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(input);
    const saltBytes = encoder.encode("0x293586Gnrg4");
    const bytes = new Uint8Array([...dataBytes, ...saltBytes]);
    console.log(bytes);

    async function hashBytes(bytes) {
      const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
      return hashHex;
    }

    const h = await hashBytes(bytes);
    console.log(h);

    const hash = Web3.utils.keccak256(Web3.utils.keccak256(h));
    console.log(hash);

    setMintResult(true);
  }

  const handleMerkleProof = (merkleProof) => {
    // Do something with the merkleProof data
    console.log(merkleProof);
    mp = merkleProof;
  };

  const handleSubmission = (msg) => {
    console.log(msg);
    setVideoModalOpen(false);
    // mp = merkleProof;
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
              Protecting smart contracts from bots.
            </h1>
            <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">
              ZKaptcha uses zero knowledge proofs to create sybil-resistant smart contracts.
            </p>
          </div>


          {account ? (
            <div className="max-w-3xl mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn text-white bg-indigo-500 hover:bg-indigo-600 rounded-full w-full mb-4 sm:w-auto sm:mb-0" href="#0" onClick={(e) => { setCheck(false); e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }}>
                  Mint with ZKaptcha
                </a>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn text-gray-600 bg-red-100 hover:bg-red-400 rounded-full w-full mb-4 sm:w-auto sm:mb-0" >
                  Wallet Needs To Be Connected!
                </a>
              </div>
            </div>
          )}

          {showButton && <div className="max-w-3xl mx-auto sm:max-w-none sm:flex sm:justify-center mt-4">
            <div data-aos="fade-up" data-aos-delay="400">
              <a className="btn text-gray-600 bg-green-100 hover:bg-green-400 rounded-full w-full mb-4 sm:w-auto sm:mb-0" >
                Minted Successfully!
              </a>
            </div>
          </div>}

          {/* <Modal id="modal" ariaLabel="modal-headlinew to" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)} onMerkleProof={handleMerkleProof} onSubmission={handleSubmission}></Modal> */}

          <Features />





        </div>
      </div>
    </section>




  );
}

export default UserHero;
