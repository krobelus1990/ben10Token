import React from "react";
import { InView } from "react-intersection-observer";
import { Fade, Bounce, Slide } from 'react-reveal';

const TokenomicsPage = () => {

    const [show, setShow] = React.useState(false);

    return (
        <InView onChange={(inView) => setShow(inView)}>
            <div id="tokenomics" className="pt-[100px] pb-[80px]">
                <div className="max-w-[1200px] mx-auto px-[20px] md:px-0 items-center">

                    {
                        show && (
                            <div className={'about-shape-container'}>
                                <Bounce duration={1000} delay={300}><h1 className="text-white text-[27px] md:text-[56px] text-left md:text-center evermore" style={{
                                    fontFamily: 'Smack', fontWeight: '600', WebkitTextStroke: '1px black',
                                    textStroke: '1px black'
                                }}
                                >
                                    tokenomics
                                </h1>
                                </Bounce>
                            </div>
                        )
                    }

                    <div className="mt-[50px] flex justify-between items-start flex-wrap">

                        <div className="w-full md:w-1/2">
                            <Slide left when={show}>

                                <span className="text-center text-white text-[18px] md:text-[30px] evermore" style={{ fontFamily: 'Smack', fontSize: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>Token Supply:</span><br />
                                <span className="text-center text-white text-[18px] md:text-[25px] evermore break-all" style={{ fontFamily: 'Smack', fontSize: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>$666,666,666,666,666</span>
                                <div
                                    className="mt-[30px] bg-[#328336] p-[30px] border-[1px] border-[#fff] rounded-tr-[30px] rounded-bl-[30px]">
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>No Taxes, No Nonsense. It’s that straightforward.</p><br />
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>LP tokens are burnt, and contract ownership is renounced.
                                    </p>
                                </div>
                            </Slide>

                        </div>

                        <div className="w-full md:w-4/12 mt-[50px] md:mt-[5px] md:mr-[50px] flex justify-center">
                            <Slide right when={show}>
                                <img src="./images/ben10/pngegg3.png" alt="" className="w-full max-w-[450px]" />
                            </Slide>

                        </div>
                    </div>
                </div>
            </div>

            {/* <img src="/images/FIRELINE.svg" alt="gapimage" className="h-[30px] md:h-[100%]" /> */}

        </InView>
    )

}

export default TokenomicsPage;
