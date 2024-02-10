import React from "react";
import '../styles/loader.css';

const Loader = () => {
    return (
        <div className={"loader-screen"}>
            <svg>
                <path d={"M29 4 L4 29 29 54 54 29 Z"} fill={"black"} stroke={"black"} />
                <path d={"M29 0 L0 29 29 58 58 29 Z"} fill={"none"} stroke="black" strokeWidth={1} />
            </svg>
        </div>
    )
}

export default Loader;