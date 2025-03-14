import React, { useEffect, useState } from "react";
import Image from "next/image";

const maleIcon = "/male.svg";
const femaleIcon = "/female.svg";

interface IprsImageProps {
    base64String?: string;
    gender?: string; // Expecting "M" or "F"
}

const IprsImage: React.FC<IprsImageProps> = ({ base64String, gender }: IprsImageProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (base64String) {
            setImageSrc(`data:image/jpeg;base64,${base64String}`);
        } else {
            setImageSrc(null);
        }
    }, [base64String]);

    return (
        <div className="w-100 h-100 rounded-[8px] flex justify-center items-center">
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="IPRS Search Result"
                    className="w-full h-full object-contain rounded-[8px]"
                />
            ) : (
                <Image
                    src={gender === "M" ? maleIcon : femaleIcon}
                    alt="Placeholder Image"
                    width={60}
                    height={60}
                    className="w-72 h-72 object-contain rounded-[8px] bg-gray-100"
                />
            )}
        </div>

    );
};

export default IprsImage;
