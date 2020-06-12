import { toast } from "react-toastify";

export const TOKEN_KEY = "@schedules_token";
export const isAuthenticated = () => {
    const authenticated = localStorage.getItem(TOKEN_KEY) !== null;

    if(!authenticated) {
        toast.error('Você precisa se autenticar!');
        return false;
    }

    return authenticated
    
  };

export const login = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const logout = () => localStorage.clear();