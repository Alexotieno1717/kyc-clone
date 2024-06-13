import type { AppProps } from 'next/app';
import { Inter as FontSans } from "next/font/google"
import {cn} from "@/lib/utils";
import Header from "@/components/Header";
import '../styles/globals.css';


const fontSans = FontSans({
    subsets: ["greek-ext"],
    variable: "--font-sans",
})

export default function App({ Component, pageProps }: AppProps) {

    return (
    <div className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
        )}
    >
    {/*  Page wrapper start  */}
        <div> 
            {/* Header */}
            <Header />

            <div>
                <Component {...pageProps} />
            </div>  
        </div>
    </div>
    );
}