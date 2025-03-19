import React from "react";
interface CustomButtonProps {
    text: string;
    myClass?: string;
    onClick?: () => void;
}

const CommonButton: React.FC<CustomButtonProps> = ({ text, myClass = "" }) => {
    return (
        <button
            className={`font-medium cursor-pointer whitespace-nowrap rounded-full border bg-black border-black text-white hover:bg-white hover:text-black transition-all duration-700 ease-in-out text-base ${myClass}
`}> {text}</button>
    );
};
export default CommonButton;