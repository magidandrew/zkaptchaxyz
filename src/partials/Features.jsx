import React, { useEffect, useState } from 'react';

import Illustration from '../images/features-illustration.svg';
// import FeaturesIcon01 from '../images/features-icon-01.svg';
// import FeaturesIcon02 from '../images/features-icon-02.svg';
// import FeaturesIcon03 from '../images/features-icon-03.svg';
// import FeaturesIcon04 from '../images/features-icon-04.svg';
import Avatar01 from '../images/avatar-01.jpg';
import Altman from '../images/altman.png';
import Armstrong from '../images/armstrong.png';
import Benet from '../images/benet.png';
import Buterin from '../images/buterin.png';
import Dorsey from '../images/dorsey.png';
import Fried from '../images/fried.png';
import Gensler from '../images/gensler.png';
import Kulechov from '../images/kulechov.png';
import Saylor from '../images/saylor.png';
import Zhao from '../images/zhao.png';
import Modal from "../utils/Modal";

import captchaCollectionABI from '../captchacollection.json';
import { WalletProvider, useWallet } from "../utils/WalletContext";
import { ethers, providers } from 'ethers';

// Import Swiper
import Swiper, { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
Swiper.use([Autoplay, Navigation]);
// const { account, linkWallet, disconnectWallet, provider } = useWallet();

function Features() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { account, linkWallet, disconnectWallet, provider } = useWallet();
  const [tokenUri, setTokenUri] = useState(null);

  var mp = null;

  const handleLinkWallet = async () => {
      await linkWallet();
      // perform further actions with the user's wallet account
  };

  const name2Uri = {
  "altman": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/altman.json",
  "armstrong": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/altman.json",
  "benet": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/benet.json",
  "buterin": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/buterin.json",
  "dorsey": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/dorsey.json",
  "fried": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/fried.json",
  "gensler": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/gensler.json",
  "kulechov": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/kulechov.json",
  "saylor": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/saylor.json",
  "zhao": "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/zhao.json"}

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const carousel = new Swiper('.carousel', {
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      autoplay: {
        delay: 7000,
      },
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
    });
  }, []);

  const handleMerkleProof = (merkleProof) => {
    // Do something with the merkleProof data
    console.log(merkleProof);
    mp = merkleProof;
  };

  const handleSubmission = async (captchaAnswer) => {
    // captchaAnswer
    console.log(provider);
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(captchaAnswer);
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
    const leaf = ethers.utils.keccak256(ethers.utils.keccak256(ethers.utils.hexlify("0x" + h)));
    console.log("leaf: " + leaf);
    const toAddress = "0x13DF5D56bAC76aaE15cfE0aEDc19D04D1522130F";
    setVideoModalOpen(false);
    const captchaCollectionContract = new ethers.Contract(toAddress, captchaCollectionABI.abi, provider.getSigner());
    // console.log("mp: " + mp);
    // console.log("leaf: "+ leaf);
    const mp1 = [
                              "0x9d5913e05fea728f85833c11432990b3fed6d9d1d46a8f8092858433bf89bc02",
                              "0x523e338ce4eaa4e78c5ba665d4a4fa60745b75a79980db547edb09a7650424e1",
                              "0x82e12e554b92fa50a3f131c905d0ba4e8e8cab2e44513ddc795b4ebf60ca6bdd",
         ]

    const leaf1 = "0x9913e4db9d1e51fb530ba665d9e874c03745aa5a211b7afdca25906328fc82c5";
    console.log(name2Uri[tokenUri]);
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(1000);
    const res = await captchaCollectionContract.createToken(name2Uri[tokenUri], mp1, leaf1);
  };


  return (
    <section className="relative">
      {/* Bg illustration */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none -mt-20 -z-10" aria-hidden="true">
        <img src={Illustration} className="max-w-none" width="1440" height="440" alt="Illustration" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-hkgrotesk mb-4">Presenting the Kaptcha Collection!</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-slate-400">
               This collection of NFTs is protected by ZKaptcha.
              </p>
            </div>
          </div>
          {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
          {/* * Custom styles in src/css/additional-styles/theme.scss */}
          <div className="carousel swiper-container">
            <div className="swiper-wrapper">
              {/* Carousel items */}
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Altman}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Sam Altman Kaptcha</div>
                </div>


                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('altman')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}


              </div>

              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Armstrong}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Brian Armstrong Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('armstrong')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Benet}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Juan Benet Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('benet')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Buterin}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Vitalik Buterin Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('buterin')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Dorsey}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Jack Dorsey Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('dorsey')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Fried}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Sam Bankman-Fried Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('fried')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Gensler}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Gary Gensler Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('gensler')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Kulechov}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl"> Stani Kulechov Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('kulechov')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Saylor}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Michael Saylor Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('saylor')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>
              <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded">
                <img
                  className="mb-3"
                  src={Zhao}
                  alt="Icon 01"
                />
                <div className="grow">
                  <div className="font-hkgrotesk font-bold text-xl">Changpeng Zhao Kaptcha</div>

                </div>
                {account ?
                <div className="text-right">
                  <a className="btn font-medium text-gray-300 hover:text-white bg-indigo-500 hover:bg-indigo-600 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); setTokenUri('zhao')}}
                  >
                    Mint Now{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
                : (
                  <div className="text-right">
                  <a className="btn font-medium text-gray-800 hover:text-white bg-red-200 hover:bg-red-500 rounded-full inline-flex items-center transition duration-150 ease-in-out group"
                  >
                  Connect Wallet!
                  </a>
                </div>
          )}
              </div>

            </div>
          </div>
          {/* Arrows */}
          <div className="flex mt-12 space-x-4 justify-end">
            <button className="carousel-prev relative z-20 w-14 h-14 rounded-full flex items-center justify-center group border border-slate-700 bg-slate-800 hover:bg-slate-700 transition duration-150 ease-in-out">
              <span className="sr-only">Previous</span>
              <svg className="w-4 h-4 fill-slate-400 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className="carousel-next relative z-20 w-14 h-14 rounded-full flex items-center justify-center group border border-slate-700 bg-slate-800 hover:bg-slate-700 transition duration-150 ease-in-out">
              <span className="sr-only">Next</span>
              <svg className="w-4 h-4 fill-slate-400 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* modal section */}
      <Modal id="modal" ariaLabel="modal-headlinew to" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)} onMerkleProof={handleMerkleProof} onSubmission={handleSubmission}></Modal>


    </section>
  );
}

export default Features;
