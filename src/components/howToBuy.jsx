import React from "react";
import { InView } from "react-intersection-observer";
import { Slide, Fade } from 'react-reveal';

const HowToBuyPage = () => {

    const [show, setShow] = React.useState(false);

    return (
        <InView onChange={(inView) => inView ? setShow(true) : setShow(false)}>
            <div id="how-to-buy" className="pt-[83px] pb-[80px]" >
                <div className="max-w-[1200px] mx-auto px-[20px]">

                    {
                        show && (
                            <Fade right cascade>
                                <h2 className="evermore text-white text-[27px] md:text-[56px] text-left md:text-center"
                                    style={{
                                        fontFamily: 'Smack', fontWeight: '600', WebkitTextStroke: '1px black',
                                        textStroke: '1px black'
                                    }}
                                >
                                    how to buy
                                </h2>
                            </Fade>
                        )
                    }

                    <Slide left when={show}>
                        <div
                            className="w-full mt-[50px] px-[30px] py-[30px] md:pl-[60px] md:pr-[20px] md:py-[30px] border-[1px] border-[#fff] flex items-center flex-col sm:flex-row justify-center md:justify-between md:flex-nowrap bg-[#328336] rounded-tr-[30px] rounded-bl-[30px]">
                            <div className="mr-0 w-[200px] mb-[30px] md:mb-0 md:mr-[30px]">
                                <img src="./images/how-to-buy/01.png" className="w-full min-w-[138px]" alt="" />
                            </div>

                            <div className="flex flex-col justify-center">

                                <h3 className="text-white text-[23px] evermore mb-[25px]" style={{ fontFamily: 'Smack' }}>Create Your Digital Lair</h3>
                                <p className="text-white text-[19px]" style={{ fontFamily: 'Mansalva' }}>
                                    Download MetaMask or your wallet of your choice from the app store or Google Play Store for free.
                                    For desktop users, acquire the Google Chrome extension by navigating to metamask.io.
                                </p>

                            </div>

                        </div>
                    </Slide>

                    <Slide right when={show}>
                        <div
                            className="w-full mt-[50px] px-[30px] py-[30px] md:pl-[60px] md:pr-[20px] md:py-[30px] border-[1px] border-[#fff] flex flex-col items-center md:flex-row justify-center md:justify-between md:flex-nowrap bg-[#328336] rounded-tr-[30px] rounded-bl-[30px]">
                            <div className="mr-0 w-[200px] mb-[30px] md:mb-0 md:mr-[30px]">
                                <img src="./images/how-to-buy/02.png" className="w-full min-w-[138px]" alt="" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-white text-[23px] evermore mb-[25px]" style={{ fontFamily: 'Smack' }}>Secure Some ETH</h3>
                                <p className="text-white text-[19px]" style={{ fontFamily: 'Mansalva' }}>
                                    You'll need ETH in your wallet to make the switch to #Ben10. If you don't have any, you can procure
                                    it directly on MetaMask, transfer from another wallet, or acquire it on a different exchange and send it to your wallet.
                                </p>
                            </div>
                        </div>
                    </Slide>

                    <Slide left when={show}>
                        <div
                            className="w-full mt-[50px] px-[30px] py-[30px] md:pl-[60px] md:pr-[20px] md:py-[30px] border-[1px] border-[#fff] flex flex-col items-center md:flex-row justify-center md:justify-between md:flex-nowrap bg-[#328336] rounded-tr-[30px] rounded-bl-[30px]">
                            <div className="mr-0 w-[200px] mb-[30px] md:mb-0 md:mr-[30px]">
                                <img src="./images/how-to-buy/03.png" className="w-full min-w-[138px]" alt="" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-white text-[23px] evermore mb-[25px]" style={{ fontFamily: 'Smack' }}>Embark on Your Quest</h3>
                                <p className="text-white text-[19px]" style={{ fontFamily: 'Mansalva' }}>
                                    Navigate to Uniswap. Visit app.uniswap.org via Google Chrome or through the browser within
                                    your MetaMask app. Connect your wallet. Input the $Ben10 token address into Uniswap, select Ben10, and give it the green light.
                                    When MetaMask calls for a wallet signature, seal the deal.
                                </p>
                            </div>
                        </div>
                    </Slide>

                    <Slide right when={show}>
                        <div
                            className="w-full mt-[50px] px-[30px] py-[30px] md:pl-[60px] md:pr-[20px] md:py-[30px] border-[1px] border-[#fff] flex flex-col items-center sm:flex-row justify-center md:justify-between md:flex-nowrap bg-[#328336] rounded-tr-[30px] rounded-bl-[30px]">
                            <div className="mr-0 w-[200px] mb-[30px] md:mb-0 md:mr-[30px]">
                                <img src="./images/how-to-buy/04.png" className="w-full min-w-[140px] h-full" alt="" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-white text-[23px] evermore mb-[25px]" style={{ fontFamily: 'Smack' }}>Trade ETH for $Ben10</h3>
                                <p className="text-white text-[19px]" style={{ fontFamily: 'Mansalva' }}>
                                    Exchange your ETH for $Ben10. We've slashed taxes to ZERO, so no need to stress about specific slippages.
                                    Although, during market rollercoasters, a smidgen of slippage might be your co-pilot.
                                </p>
                            </div>
                        </div>
                    </Slide>

                    <div className="flex flex-col items-center justify-between mt-12 md:flex-row">
                        
                        <Fade left cascade>
                            <img src="./images/ben10/pngwing9.png" className="hidden md:block mt-[-30px] max-w-[520px] max-h-[480px]" alt="" />
                        </Fade>

                        <Fade right cascade>
                            <img src="./images/ben10/pngwing.com.png" className="md:mt-[-30px] max-w-[440px] max-h-[400px]" alt="" />
                        </Fade>

                    </div>

                </div>
            </div>

            {/* <img src="/images/FIRELINE.svg" alt="gapimage" /> */}

        </InView>
    )

}

export default HowToBuyPage;
