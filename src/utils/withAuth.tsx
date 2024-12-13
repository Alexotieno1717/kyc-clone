"use client"
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';

const withAuth = (WrappedComponent: React.ComponentType) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated()) {
                router.push('/auth/signin');
            } else {
                router.push("/"); // Redirect to home if authenticated
            }
        }, [router]);

        // Prevent rendering until authentication is checked
        if (!isAuthenticated()) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;

