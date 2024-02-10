import React from "react";

const CurrencyItem = ({ image, label, isSelected, onClick }) => {

    const borderColorClass = isSelected ? 'border-black' : '#a5aaae';

    const textColor = isSelected ? 'black' : 'rgb(165, 170, 174)'

    const fontSize = isSelected && '19px';

    const backgroundColor = isSelected && '#64cc4f';

    return (
        <div
            className={`flex flex-row justify-center items-center border rounded-[0.5rem] w-[45%] p-2 bg-[#fff] hover:bg-[#64cc4f] cursor-pointer ${borderColorClass}`}
            onClick={onClick}
            style={{ boxShadow: 'rgb(0 0 0 / 98%) 1.5px 1.5px 1.5px 1.5px', backgroundColor }}
        >
            <img alt={label} fetchpriority="high" width="20" height="20" decoding="async" data-nimg="1" src={image} />
            <span style={{ textColor, fontFamily: 'Smack', fontSize, color: 'black' }} className="ml-2">{label}</span>
        </div>
    );
}

export default CurrencyItem;
