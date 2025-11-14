import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(() => {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
});

useEffect(() => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}, [user]);

    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
      setUser(userData);
      if (token) {
        localStorage.setItem('token', token);
      }
    };
    
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    };
    const updateUser= (updateUser) =>{
      setUser(prevUser => ({
        ...prevUser,...updateUser
      }))
    }
  return (
    <AuthContext.Provider value={{user,login,logout,updateUser}}>
        {children}
    </AuthContext.Provider>
  )
}
 
export const useAuth = ()=>{
    return useContext(AuthContext)
};