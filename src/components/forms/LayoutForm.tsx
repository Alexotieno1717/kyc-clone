import Image from "next/image";
import React from "react";

interface ILayoutFormProps {
    children: React.ReactNode;
    title: string;
    description: string;
    side?: "right" | "left";
}

const LayoutForm = ({
                        children,
                        title,
                        description,
                        side = "left",
                    }: ILayoutFormProps) => {
    return (
        <main className="flex min-h-screen">
            <div
                className={`basis-1/2 w-full lg:w-1/2 hidden lg:block relative flex-1 ${
                    side === "right" ? "order-2" : "order-1"
                } `}
            >
                <img
                    src={"/assets/images/auth-guy.png"}
                    alt="banner"
                    className="absolute inset-0 object-cover object-top w-full h-full"
                />
                <div
                    aria-hidden="true"
                    className="absolute h-full w-full mix-blend-normal bg-gradient-to-tr from-[#78B9E4] from-[44%] to-[#F8FAFC] to-100% opacity-80"
                />
                <div className="lg:px-[69px]  xl:px-[138px] grid h-screen z-30">
                    <div className="grid self-center mx-auto space-y-12">
                        <Image
                            src={"/assets/icons/stars.png"}
                            width={80}
                            height={80}
                            alt="star"
                            className="z-30"
                        />
                        <dt className="z-50 space-y-6 ">
                            <h1 className=" text-7xl text-white font-medium z-10 leading-[90px] max-w-[30.938rem] ">
                                {title}
                            </h1>
                            <p className=" text-xl text-white font-medium leading-8 z-10 max-w-[30.938rem] ">
                                {description}
                            </p>
                        </dt>
                    </div>
                    <div className="grid self-end" />
                </div>
            </div>

            <div
                className={`basis-1/2 w-full lg:w-1/2 flex-1 flex flex-col items-center justify-center sm:px-6 py-12 px-4   ${
                    side === "right" ? "order-1" : "order-2"
                }`}
            >
                {children}
            </div>
        </main>
    );
};

export default LayoutForm;
