import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fontSans = FontSans({
    subsets: ["greek-ext"],
    variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Define routes where you don't want the Header to appear
    const noHeaderRoutes = ['/auth/signin', '/auth/signup'];

    return (
        <div
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
            <div>
                <ToastContainer limit={1} position="top-right" autoClose={5000} />
                {/* Render Header only if the current route is not in the noHeaderRoutes array */}
                {!noHeaderRoutes.includes(router.pathname) && <Header />}

                <div>
                    <Component {...pageProps} />
                </div>
            </div>
        </div>
    );
}
