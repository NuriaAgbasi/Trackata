import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import supabase from '../config/supabaseClient'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {

            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsAuthenticated(true);
                setUser(session.user);
                setEmail(session.user.email);
            }
        };
        fetchSession();
    }, []);

    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            const { session } = data;
            Cookies.set('auth', JSON.stringify(session), { path: '/', secure: true, sameSite: 'Strict' });
            setIsAuthenticated(true);
            setUser(session.user);
            setEmail(session.user.email);
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            Cookies.remove('auth');
            setIsAuthenticated(false);
            setUser(null);
            setEmail(null);
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
