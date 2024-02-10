import React from 'react'
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Airdrop from './airdrop';

const Header = () => {

    React.useEffect(() => {
        const smoothScroll = (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth',
                });
            }
        };

        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach((link) => {
            link.addEventListener('click', smoothScroll);
        });

        return () => {
            anchorLinks.forEach((link) => {
                link.removeEventListener('click', smoothScroll);
            });
        };
    }, []);

    const [selectedCurrency, setSelectedCurrency] = React.useState(null);

    const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const handleBuyButton = () => {
        setSelectedCurrency()
    }
    const staking = "https://arbpanda.ai/";
    const docs = "/";
    const buy = "https://app.camelot.exchange/?token1=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1&token2=0x11524A5765066A5362Ac184f7dB9FF51286Fe99a";
    return (

        <div className='relative bg-[#328336] py-3 sm:py-4 md:py-5 flex items-center justify-between shadow-md'>
            <div className="flex items-center justify-between w-full max-w-screen-xl px-4 mx-auto sm:px-6 md:px-8">
                <div className="flex-shrink-0">
                    <a href={"/"}>
                        <img src="/images/ben10/pngegg.png" alt="Logo" className="h-18 sm:h-12 md:h-16 w-[80px]" style={{ border: '1px solid #328336', borderRadius: '0.5rem' }} />
                    </a>
                </div>

                <nav className="flex-wrap items-center hidden space-x-4 pc-menu md:flex">
                    <a href={'#home'} className="text-white text-sm sm:text-base md:text-[18px] evermore opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>Home</a>
                    <a href={'#about'} className="text-white text-sm sm:text-base md:text-[18px] Exorcist hover:opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>About</a>
                    <a href={'#how-to-buy'} className="text-white text-sm sm:text-base md:text-[18px] evermore hover:opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>How to Buy</a>
                    {/* <Link to="https://bridge.pepe.vip/" target="_blank"
                        className="text-white text-sm sm:text-base md:text-[12px] evermore hover:opacity-[0.7]" style={{ fontFamily: 'Evermore' }}>Bridge</Link> */}
                    <a href={"#tokenomics"} className="text-white text-sm sm:text-base md:text-[18px] evermore hover:opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>Tokenomics</a>
                    <a href={"#roadmap"} className="text-white text-sm sm:text-base md:text-[18px] evermore hover:opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>Roadmap</a>
                    <a href={staking} className="text-white text-sm sm:text-base md:text-[18px] evermore hover:opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>Join Staking</a>
                    <a href={docs} className="text-white text-sm sm:text-base md:text-[18px] evermore hover:opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>Docs</a>
                    <a href={'/airdrop'} className="text-white text-sm sm:text-base md:text-[18px] evermore hover:opacity-[0.7] no-underline" style={{ fontFamily: 'Smack' }}>Airdrop</a>
                    <div style={{ display: 'flex', gap: 12 }} className='flex flex-col items-center justify-center'>
                        <a href={buy} className='text-white text-sm sm:text-base md:text-[18px] evermore hover:opacity-[0.7] px-3 py-2 bg-[#328336] border border-white no-underline rounded-full hover:bg-[#ffffffa4] hover:text-[#328336]' style={{ fontFamily: 'Smack' }}>
                                Buy Now
                        </a>
                    </div>
                </nav>

                <div className="md:hidden sp-menu">
                    <button id="mobile-menu-button" className="p-2 text-white focus:outline-none" onClick={toggleMobileMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div id="mobile-menu" className={mobileMenuVisible ? 'block' : 'hidden'}>
                        <div className="flex justify-center w-full">
                            <a href={'#home'} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">Home</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <a href={'#about'} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">About</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <a href={'#how-to-buy'} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">How to Buy</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <a href={"#tokenomics"} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">Tokenomics</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <a href={"#roadmap"} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">Roadmap</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <a href={staking} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">Join Staking</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <a href={docs} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">Documentation</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <a href={Airdrop} className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">Airdrop</a>
                        </div>
                        <div className="flex justify-center w-full">
                            <Link to="https://app.camelot.exchange/?token1=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1&token2=0x11524A5765066A5362Ac184f7dB9FF51286Fe99a"
                                target="_blank" className="block py-2 text-sm text-white no-underline sm:text-base md:text-lg">Buy Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Header;
