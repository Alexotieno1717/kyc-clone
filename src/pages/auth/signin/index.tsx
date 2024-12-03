"use client";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import LayoutForm from "@/components/forms/layoutform";
import { auth } from "@/lib/firebase"; // Firebase configuration
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import { SuccessAlert } from "@/utils/alerts";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Signin = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Toggle password visibility
    const togglePassword = () => setPasswordVisible(!passwordVisible);

    // Handle email/password sign-in
    const handleSubmit = async (values: { email: string; password: string }) => {
        setError(null); // Reset error state
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            // Persist user data in localStorage
            localStorage.setItem("user", JSON.stringify(user));

            SuccessAlert("Log in Successful");
            console.log("Sign-in successful");
            await router.push("/");
        } catch (err: any) {
            console.error("Sign-in error:", err);
            setError("Failed to sign in. Please check your credentials.");
        }
    };

    // Handle Google sign-in
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Persist user data in localStorage
            localStorage.setItem("user", JSON.stringify(user));

            SuccessAlert("Google Sign-In Successful");
            console.log("Google Sign-in successful");
            await router.push("/");
        } catch (err: any) {
            console.error("Google Sign-in error:", err);
            setError("Failed to sign in with Google.");
        }
    };

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Persist user in localStorage if authenticated
                localStorage.setItem("user", JSON.stringify(user));
                console.log("User is already logged in:", user);
                router.push("/");
            } else {
                localStorage.removeItem("user");
            }
        });
        return () => unsubscribe();
    }, [router]);

    return (
        <>
            <LayoutForm
                title="Start turning your ideas into reality."
                description="Sign in to your account and get full access to all features."
                side="right"
            >
                <div className="mx-auto lg:w-96 max-w-sm grid h-[calc(100vh_-_120px)]">
                    <div className="grid self-start" />
                    <div className="grid self-center space-y-20">
                        <Image
                            src={"/assets/icons/bongasms-logo.png"}
                            width={195}
                            height={64}
                            alt="BongaSMS logo"
                            className="mx-auto"
                        />
                        <div>
                            <h2 className="mb-3 text-4xl font-semibold text-dark">Sign in</h2>
                            <p className="mb-8 text-base font-normal text-gray-600">
                                Welcome! Please enter your details.
                            </p>
                            {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                <Form className="space-y-5">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <Field
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        />
                                        <span className="text-sm text-red-500">
                                            <ErrorMessage name="email" />
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Password</label>
                                        <div className="relative">
                                            <Field
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                type={passwordVisible ? "text" : "password"}
                                                className="relative block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                            />
                                            <button
                                                type="button"
                                                className="absolute bottom-3 right-3"
                                                onClick={togglePassword}
                                            >
                                                {passwordVisible ? (
                                                    <EyeIcon className="w-5 h-5 text-sm text-gray-500" />
                                                ) : (
                                                    <EyeOffIcon className="w-5 h-5 text-sm text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                        <span className="text-sm text-red-500">
                                            <ErrorMessage name="password" />
                                        </span>
                                    </div>

                                    <div className="flex justify-start">
                                        <Link
                                            href="/auth/forgotpassword"
                                            className="text-sm font-semibold text-primary"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <Button
                                        variant={"default"}
                                        type="submit"
                                        className="flex justify-center w-full px-4 py-3 mb-8 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none"
                                    >
                                        Sign in
                                    </Button>
                                    <div className="w-full text-center mb-4">
                                        <Button
                                            variant="outline"
                                            type="button"
                                            className="flex items-center justify-center w-full px-4 py-3 space-x-3 text-base font-semibold border border-gray-200 rounded-lg shadow-sm focus:outline-none"
                                            onClick={handleGoogleSignIn}
                                        >
                                            <img src="/assets/icons/google.png" className="w-6 h-6" alt="Google"/>
                                            <span>Sign in with Google</span>
                                        </Button>
                                    </div>
                                    <div className="inline-flex justify-center w-full">
                                        <p className="mr-2 text-sm font-normal">Don&apos;t have an account?</p>
                                        <Link
                                            href="/auth/signup"
                                            className="text-sm font-semibold text-primary"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className="grid self-end" />
                </div>
            </LayoutForm>
        </>
    );
};

export default Signin;
