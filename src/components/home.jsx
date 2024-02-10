import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import CurrencyItem from './CurrencyItem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContractRead, useContractWrite } from 'wagmi';
import { PRESALE_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from '../utils/env';

import * as  presaleContractABI from '../token_presale_abi.json';
import * as  erc20ContractABI from '../token_abi.json';
import { useCallback } from 'react';
import { parseEther } from 'viem';

import { InView } from "react-intersection-observer";
import { Zoom, Fade, Bounce } from 'react-reveal';

const HomePage = () => {

    const { abi } = presaleContractABI
    const { abi: erc20ABI } = erc20ContractABI

    const [selectedCurrency, setSelectedCurrency] = React.useState(null);
    const { write: buyWithUSDT } = useContractWrite({
        address: PRESALE_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'buyWithUSDT'
    })

    const { write: buyTokens } = useContractWrite({
        address: PRESALE_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'buyTokens'
    })

    const { writeAsync: approve } = useContractWrite({
        address: USDT_CONTRACT_ADDRESS,
        abi: erc20ABI,
        functionName: 'approve'
    })

    const handleCurrencyClick = (currency) => {
        setSelectedCurrency(currency);
    };

    const [value, setValue] = React.useState(0);

    const [dominoValue, setDominoValue] = React.useState(0);

    const handleBuyButton = useCallback(async (address, currency) => {

        if (currency === 'USDT') {
            await approve({ args: [PRESALE_CONTRACT_ADDRESS, value * 1000000], from: address });
            buyWithUSDT({ args: [value], from: address });
        }

        if (currency === 'ETH') {

            buyTokens({
                value: parseEther(value.toString()),
                from: address
            })
        }


    }, [buyTokens, buyWithUSDT, approve, value])

    const [show, setShow] = React.useState(false);
    
    const openBuyModal = () => (
        console.log('1')
    )

    return (
        <InView onChange={(inView) => setShow(inView)}>
            <div className="absolute w-full opacity-[0.2] top-[0px] left-0 bg-contain bg-no-repeat"
                style={{ height: 'calc(100vh - 151px)', backgroundImage: 'url(./images/ben10/pngwing4.png)', boxShadow: 'inset rgba(0, 0, 0, 0.5) 0px 3px 8px 0px' }}>
            </div>

            <div id="home" className="relative z-[2]">
                <div className="pt-[147px]">
                    <div className="max-w-[1200px] mx-auto main-visual md:pr-0 flex flex-col">
                        <div className="flex flex-row flex-wrap items-center justify-between">
                            <div className="w-full md:max-w-[500px] flex flex-col items-center justify-start">

                                {
                                    show && (
                                        <div className={'about-shape-container'}>
                                            <Bounce duration={1000} delay={300}><img src="/images/ben10/pngegg.png" alt="Logo" className="h-[100px] sm:h-12 md:h-24" /></Bounce>
                                        </div>
                                    )
                                }

                                <div className='buy-usdt flex flex-col items-center justify-center border border-black rounded-[1rem] mx-auto border-3'>
                                    <div className='bg-[#fff] flex flex-col items-center rounded-t-[1rem] w-full'>
                                        <div className='flex flex-col items-center justify-center px-8 py-2'>
                                            <span className='flex text-black' style={{ fontFamily: 'Might', fontWeight: '700', fontSize: '32px' }}>Stage Selling Fast 🔥</span>

                                            <span className='flex mt-2 text-black' style={{ fontFamily: 'Might', fontSize: '1.6rem' }}>
                                                RAISED
                                                <span style={{ fontFamily: 'Might', fontSize: '1.05em', fontWeight: '700' }}>
                                                    $25,495.27
                                                </span>
                                                / $50,000.00
                                            </span>

                                            <ProgressBar animated now={50} variant="danger" style={{ width: '100%', border: 'solid 1px'}} className='mt-4' />

                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between py-1 px-4 w-full bg-[#fff]'>
                                        <CurrencyItem
                                            image="/images/eth.svg"
                                            label="ETH"
                                            isSelected={selectedCurrency === 'ETH'}
                                            onClick={() => handleCurrencyClick('ETH')}
                                        />

                                        <CurrencyItem
                                            image="/images/usdt.svg"
                                            label="USDT"
                                            isSelected={selectedCurrency === 'USDT'}
                                            onClick={() => handleCurrencyClick('USDT')}
                                        />

                                    </div>

                                    <div className='flex bg-[#fff] flex-col w-full'>

                                        <div className='flex bg-[#fff] py-2 px-8 items-center justify-between w-full'>
                                            <span style={{ fontFamily: 'Might' }}>
                                                Current Price: <span style={{ fontFamily: 'Smack', fontWeight: '600' }}> $0.0133</span>
                                            </span>
                                            <span style={{ fontFamily: 'Might' }}>
                                                Next Stage Price: <span style={{ fontFamily: 'Smack', fontWeight: '600' }}> $0.014</span>
                                            </span>
                                        </div>

                                        <div className='flex bg-[rgba(0,0,0,0.4)] my-2 mx-auto items-center justify-between w-[90%] h-[1px]' />

                                        <div className='flex flex-col items-center justify-between w-full sm:flex-row'>
                                            <div className='flex flex-col items-center justify-between md:w-80% mb-4 md: ml-4'>
                                                <span style={{ color: 'black', fontFamily: 'Smack' }}>AMOUNT IN {selectedCurrency} YOU PAY</span>
                                                <div className='flex flex-col border rounded-[0.5rem] bg-[#fff] py-2 px-4' style={{ boxShadow: 'rgb(0 0 0 / 98%) 1.5px 1.5px 1.5px 1.5px' }}>

                                                    <div className='flex flex-row items-center justify-between'>
                                                        <input value={value} className='border-none outline-none appearance-none w-[80%]' type='text' inputMode='numeric' onChange={({ target: { value } }) => {
                                                            if (!isNaN(value)) {
                                                                setValue(value);
                                                            }
                                                        }} />
                                                        <span style={{ color: 'black', marginLeft: '0.5rem', fontFamily: 'Smack', height: '1.9rem' }}>{selectedCurrency === 'ETH' ? 'ETH' : 'USD'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex flex-col items-center justify-between mb-4 ml-4 md:mr-4'>
                                                <span style={{ color: 'black', fontFamily: 'Smack' }}>AMOUNT YOU RECEIVE</span>
                                                <div className='flex flex-col border rounded-[0.5rem] bg-[#fff] py-2 px-4' style={{ boxShadow: 'rgb(0 0 0 / 98%) 1.5px 1.5px 1.5px 1.5px' }}>
                                                    <div className='flex items-center justify-between'>
                                                        <input value={selectedCurrency === "ETH" ? value / (0.000333 * 2200) : value / 0.000333} disabled className='border-none outline-none appearance-none w-[80%]' type='text' inputMode='numeric' onChange={({ target: { value } }) => {
                                                            if (!isNaN(value)) {
                                                                setDominoValue(value);
                                                            }
                                                        }} />
                                                        <img loading="lazy" src="/images/ben10/pngegg2.png" className="" aria-hidden="false" alt="Doge" style={{ height: ' 1.9rem' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex bg-[rgba(0,0,0,0.4)] my-2 mx-auto items-center justify-between w-[90%] h-[1px]' />

                                    </div>

                                    <div className='flex bg-[#fff] flex-col w-full items-center justify-center py-2 px-4 rounded-bottom-4 pb-2'>

                                        <ConnectButton.Custom>
                                            {({
                                                account,
                                                chain,
                                                openAccountModal,
                                                openChainModal,
                                                openConnectModal,
                                                authenticationStatus,
                                                mounted,
                                            }) => {
                                                // Note: If your app doesn't use authentication, you
                                                // can remove all 'authenticationStatus' checks
                                                const ready = mounted && authenticationStatus !== 'loading';
                                                const connected =
                                                    ready &&
                                                    account &&
                                                    chain &&
                                                    (!authenticationStatus ||
                                                        authenticationStatus === 'authenticated');

                                                return (
                                                    <div
                                                        {...(!ready && {
                                                            'aria-hidden': true,
                                                            'style': {
                                                                opacity: 0,
                                                                pointerEvents: 'none',
                                                                userSelect: 'none',
                                                            },
                                                        })}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {(() => {
                                                            if (!connected) {
                                                                return (
                                                                    <button onClick={openConnectModal} type="button" style={{ fontFamily: 'Might', boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px', fontSize: '20px', marginBottom: '1rem' }} className="flex p-2 bg-[#64cc4f] text-black items-center justify-center focus:outline-none border rounded-[0.5rem] w-full hover:bg-[#328336]">
                                                                        Connect Wallet
                                                                    </button>
                                                                );
                                                            }

                                                            if (chain.unsupported) {
                                                                return (
                                                                    <button onClick={openChainModal} type="button" style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                                                                        Wrong network
                                                                    </button>
                                                                );
                                                            }

                                                            return (
                                                                <div style={{ display: 'flex', gap: 12 }} className='flex flex-col items-center justify-center'>
                                                                    <button
                                                                        onClick={openChainModal}
                                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                                        type="button"
                                                                    >
                                                                        {chain.hasIcon && (
                                                                            <div
                                                                                style={{
                                                                                    background: chain.iconBackground,
                                                                                    width: 12,
                                                                                    height: 12,
                                                                                    borderRadius: 999,
                                                                                    overflow: 'hidden',
                                                                                    marginRight: 4,
                                                                                }}
                                                                            >
                                                                                {chain.iconUrl && (
                                                                                    <img
                                                                                        alt={chain.name ?? 'Chain icon'}
                                                                                        src={chain.iconUrl}
                                                                                        style={{ width: 12, height: 12 }}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        {chain.name}
                                                                    </button>

                                                                    <button onClick={() => handleBuyButton(account.address, selectedCurrency)} type="button" style={{ fontFamily: 'Might', boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px', fontSize: '20px', marginBottom: '1rem' }} className="flex p-2 bg-[#328336] text-black items-center justify-center focus:outline-none border rounded-[0.5rem] w-full hover:bg-[#64cc4f]">
                                                                        Buy Now
                                                                    </button>

                                                                    <button onClick={openAccountModal} type="button">
                                                                        {account.displayName}
                                                                        {account.displayBalance
                                                                            ? ` (${account.displayBalance})`
                                                                            : ''}
                                                                    </button>

                                                                </div>
                                                            );
                                                        })()}
                                                    </div>
                                                );
                                            }}
                                        </ConnectButton.Custom>

                                    </div>

                                </div>
                            </div>

                            <div className='hidden md:flex md:flex-col items-center justify-center w-[50%]'>
                                {
                                    show && (
                                        <Fade right cascade>
                                            <img src="./images/ben10/pngegg2.png" className="mt-[-30px] max-w-[520px] max-h-[480px]" alt="" />
                                        </Fade>
                                    )
                                }

                                {
                                    show && (
                                        <Fade right cascade>
                                            <p className="text-white text-[28px] mt-[10px] md:text-left" style={{ fontFamily: 'Mansalva' }}>
                                                Welcome to our presale event, where the bold meet the daring, and crypto gets a devilish twist.
                                                Join us, and let's stir up some digital mayhem together.
                                            </p>
                                        </Fade>
                                    )
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <img src="/images/FIRELINE.svg" alt="gapimage" /> */}

        </InView>
    )

}

export default HomePage;
