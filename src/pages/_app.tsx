import type { AppProps } from 'next/app';
import { Inter as FontSans } from "next/font/google"
import {cn} from "@/lib/utils";
import Header from "@/components/Header";
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            <ToastContainer limit={1} position='top-right' autoClose={5000} />
            {/* Header */}
            <Header />

            <div>
                <Component {...pageProps} />
            </div>  
        </div>
    </div>
    );
}

