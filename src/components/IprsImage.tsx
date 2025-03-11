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
                <p>No image available</p>
            )}
        </div>
    );
};

export default IprsImage;
