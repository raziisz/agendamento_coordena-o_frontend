import { toast } from "react-toastify";

export const isAuthenticated = () => {
    const authenticated = localStorage.getItem('auth') !== null;

    if(!authenticated) {
        toast.error('Você precisa se autenticar!');
        return false;
    }

    return authenticated
    
  };

export const login = (token) => localStorage.setItem('auth', token);
export const getToken = () => localStorage.getItem('auth');
export const logout = () => localStorage.clear();