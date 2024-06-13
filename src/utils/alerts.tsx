// react toastify alert
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from "react-toastify";

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