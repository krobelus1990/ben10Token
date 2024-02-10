import React from "react";
import { InView } from "react-intersection-observer";
import { Slide, Fade } from 'react-reveal';

const AboutPage = () => {

    const [show, setShow] = React.useState(false);

    return (
        <InView onChange={(inView) => setShow(inView)}>
            <div id="about" className="pt-[100px] pb-[80px]">
                <div className="max-w-[1200px] mx-auto flex justify-space-between flex-wrap-reverse items-center">
                    <div className="items-center w-full md:w-1/2">

                        <Slide left delay={300} when={show}>

                            <img src="/images/ben10/pngwing.com3.png" className="w-full my-auto max-h-[600px] p-[10px]" alt="" style={{ imageRendering: 'smooth' }} />

                        </Slide>

                    </div>
                    <div className="w-full md:w-1/2 pl-40px px-[20px] md:pl-[100px] md:min-w-[350px]">

                        {
                            show && (
                                <Fade right cascade>
                                    <span className="text-white mb-[50px] text-[27px] md:text-[56px] font-semibold text-center" style={{
                                        fontFamily: 'Smack', fontWeight: '600', WebkitTextStroke: '1px black',
                                        textStroke: '1px black'
                                    }}>
                                        about
                                    </span>
                                </Fade>
                            )
                        }

                        <div>
                            {
                                show && (
                                    <Fade right cascade>
                                        <p className="text-white text-[23px] break-all" style={{ marginTop: '2rem', fontFamily: 'Mansalva' }}>
                                            Ben10 is weary of the mind-numbing parade of trash coins, steps into the limelight. It's time for
                                            the world's most mischievous meme to reign superme.
                                        </p>
                                    </Fade>
                                )
                            }

                            <br />

                            {
                                show && (
                                    <Fade right cascade>
                                        <p className="text-white text-[23px]" style={{ fontFamily: 'Mansalva' }}>
                                            Ben10 didn't tiptoe into the scene. Launched in a presale blitz, free from the clutches of
                                            preordained deals, unburdened by taxes, with the LP incinerated, and the contract cast into the
                                            abyss, this coin thrives on controversy. It's not a just a coin; it's a definance. A railying cry
                                            against the mundane, a declaration of rebellion. In a word saturated with the uninspired. $DOMI emerges
                                            as a beacon of audacity. Let the Ben10 effect commence.
                                        </p>
                                    </Fade>
                                )
                            }

                        </div>

                    </div>
                </div>
            </div>

            {/* <img src="/images/FIRELINE.svg" alt="gapimage" /> */}

        </InView>
    )
}

export default AboutPage;
