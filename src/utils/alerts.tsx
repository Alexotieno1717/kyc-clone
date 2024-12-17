// react toastify alert

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// toast
export const SuccessAlert = (message? : string) => {
    if (message) {

        toast.success(`${message}`);

    } else {
        
        toast.success("Successful Submitted your request !");

    }
}

export const ValidationAlert = (message: string) => {
    toast.error(`${message}! 🛑`);
}

export const ErrorAlert = (error: string) => {
    toast.error(`${error}! 😞`);
}

export const AlertContainer = () => ( <ToastContainer autoClose={5000}/> )