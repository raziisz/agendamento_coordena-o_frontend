import { toast } from "react-toastify";
import jwtDecode from 'jwt-decode';

export const decoded = () => {
  const res = jwtDecode(localStorage.getItem(TOKEN_KEY))
  return res
}

export const TOKEN_KEY = "@schedules_token";
export const isAuthenticated = () => {
    const authenticated = localStorage.getItem(TOKEN_KEY) !== null;

    if(!authenticated) {
        toast.error('Você precisa se autenticar!');
        return false;
    }

    return authenticated
    
  };

export const login = (token, user) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem(TOKEN_KEY, token)
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () =>  JSON.parse(localStorage.getItem('user'))



export const logout = () => localStorage.clear();