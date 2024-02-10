import React from "react";
import { InView } from "react-intersection-observer";
import { Fade, Bounce, Slide } from 'react-reveal';

const ContactPage = () => {

    const twitter = "https://twitter.com/Arbpanda";
    const telegram = "https://t.me/arbpandatoken";

    const [show, setShow] = React.useState(false);

    return (
        <InView onChange={(inView) => setShow(inView)}>
            <div id="contact" className="pt-[100px] pb-[100px]">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center px-[20px]">

                    {
                        show && (
                            <div className={'about-shape-container'}>
                                <Bounce duration={1000} delay={300}>
                                    <h1 className="text-white text-[27px] md:text-[56px] text-left md:text-center evermore"
                                        style={{
                                            fontFamily: 'Smack',
                                            fontWeight: '600',
                                            WebkitTextStroke: '1px black', // For Webkit browsers (Chrome, Safari)
                                            textStroke: '1px black', // For other browsers
                                        }}
                                    >
                                        contact
                                    </h1>
                                </Bounce>
                            </div>
                        )

                    }

                    <img src="/images/ben10/logo.png" className="max-w-[210px] mt-[20px]" alt="" style={{ border: '1px solid #328336', borderRadius: '0.5rem' }} />

                    <div className="flex flex-row items-center mt-4">
                        <a href={twitter}>
                            <img src="/images/twitter.webp" alt="twitter" className="w-20 h-auto transition-transform transform hover:scale-110" />
                        </a>
                        <a href={telegram} className="ml-2">
                            <img src="/images/telegram.webp" alt="telegram" className="w-20 h-auto transition-transform transform hover:scale-110" />
                        </a>

                    </div>

                    <div className="mt-[50px] max-w-[770px]">

                        <Slide left when={show}>
                            <p className="text-white text-center text-[20px]" style={{ fontFamily: 'Mansalva' }}>
                                $Ben10 coin is in no way associated  with Bartosz Walaszek or his creation Ben10 the Devil from the Bad Exorcist series.
                                Instead, it pays tribute to this iconic meme in playful and lighthearted manner.
                            </p>
                        </Slide>

                        <br />

                        <Slide right when={show}>

                            <p className="text-white text-center text-[20px]" style={{ fontFamily: 'Mansalva' }}>
                                $Ben10 is a meme coin created solely for entertainment purposes. It holds no intrinsic value, and
                                there are no promises of financial gains. No official team or structured roadmap is associated with this project.
                                The coin is entirely whimsical, designed purely for amusement.
                            </p>
                        </Slide>
                        
                    </div>
                </div>
            </div>
        </InView>
    )

}

export default ContactPage;
