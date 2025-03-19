import React from "react";
interface CustomButtonProps {
    text: string;
    myClass?: string;
}

const CommonHeading: React.FC<CustomButtonProps> = ({ text, myClass = "" }) => {
    return (
        <h2
            className={`font-bold lg:text-5xl text-[32px] ff-integral text-center ${myClass}
`}> {text}</h2>
    );
};
export default CommonHeading;