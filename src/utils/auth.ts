export const isAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        return !!user; // Returns true if user data exists
    }
    return false;
};
