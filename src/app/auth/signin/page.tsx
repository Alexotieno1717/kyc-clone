"use client";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { SuccessAlert } from "@/utils/alerts";
import axios from "axios";
import LayoutForm from "@/components/forms/LayoutForm";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Signin = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Toggle password visibility
    const togglePassword = () => setPasswordVisible(!passwordVisible);

    const handleSubmit = async (values: { email: string; password: string }) => {
        setError(null); // Reset error state
        setLoading(true);

        try {
            const response = await axios.post('/api/signin', {
                email: values.email,
                password: values.password,
            });

            const data = response.data;
            localStorage.setItem('user', JSON.stringify(data)); // Save user data to localStorage
            localStorage.setItem("kyc_auth", JSON.stringify(data.kyc_auth));
            localStorage.setItem("access_token", data.access_token);

            SuccessAlert("Login Successful");
            router.push("/");
        } catch (error) {
            console.error('Login error:', error);

            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "An error occurred during login.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


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

                                    <div className="flex flex-col justify-start">
                                        <div>
                                            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
                                        </div>
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
                                        className="flex justify-center w-full px-4 py-3 mb-8 bg-blue-400 text-white text-base font-semibold border border-gray-200 rounded-lg shadow-sm focus:outline-none"
                                    >
                                        {loading ? 'Loading...' : 'Sign in'}
                                    </Button>
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
