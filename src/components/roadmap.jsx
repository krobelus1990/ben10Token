import React from "react";
import { InView } from "react-intersection-observer";
import { Fade, Bounce, Slide } from 'react-reveal';

const RoadmapPage = () => {

    const [show, setShow] = React.useState(false);

    return (
        <InView onChange={(inView) => setShow(inView)}>
            <div id="roadmap" className="pt-[100px] pb-[100px]">
                <div className="max-w-[1200px] mx-auto w-full px-[20px]">
                    <div className="flex flex-col items-center justify-around w-full md:justify-between md:flex-row">

                        <Slide left when={show}>
                            <img src="./images/ben10/pngwing.com13.png" className="min-w-[300px] md:block h-[280px] mr-3 mt-[90px]" alt="" style={{ imageRendering: 'smooth' }} />
                        </Slide>

                        <div className="w-full min-w-[300px]">

                            {
                                show && (
                                    <div className={'about-shape-container'}>
                                        <Bounce duration={1000} delay={300}>
                                            <h1 className="text-white text-[27px] md:text-[56px] text-center mt-4 md:text-center evermore"
                                                style={{
                                                    fontFamily: 'Smack', fontWeight: '600', WebkitTextStroke: '1px black',
                                                    textStroke: '1px black'
                                                }}
                                            >
                                                roadmap
                                            </h1>
                                        </Bounce>
                                    </div>
                                )

                            }

                            <Fade bottom delay={1 * 300} when={show}>
                                <div
                                    className="mt-[30px] w-content bg-[#328336] p-[30px] border-[1px] border-[#fff] rounded-tr-[30px] rounded-bl-[30px]">
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>Phase 1: Meme Mania</p>
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>Phase 2: Polish Perks and HODL</p>
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>Phase 3: Vodka Vibes Takeover</p>
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>Phase 4: Gift Bonanza & Toasts</p>
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>Phase 5: The Great Vodka Bash</p>
                                    <p className="text-white text-[22px]" style={{ fontFamily: 'Mansalva' }}>Phase 6: Eternal Revelry</p>
                                </div>
                            </Fade>
                            
                        </div>

                        <Slide left when={show}>

                            <img src="./images/ben10/pngwing.com11.png" className="min-w-[300px] h-[280px] hidden md:block ml-3 mt-[90px]" alt="" style={{ imageRendering: 'smooth' }} />

                        </Slide>

                    </div>
                </div>
            </div>

            {/* <img src="/images/FIRELINE.svg" alt="gapimage" /> */}

        </InView>
    )

}

export default RoadmapPage;