import {useEffect, useState} from "react";

const IprsImage = ({ base64String }: { base64String?: string }) => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        if (base64String) {
            setImageSrc(`data:image/jpeg;base64,${base64String}`);
        }
    }, [base64String]);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt="IPRS Search Result" className="w-60 h-60 object-cover" />
            ) : (
                <p className='flex justify-center items-center py-24 border border-gray-300 p-10 rounded-[8px] text-gray-400'>No image available</p>
            )}
        </div>
    );
};

export default IprsImage;
