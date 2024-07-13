import { getCurrentUser } from "@/lib/appwrite";
import React, { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextType {
  isLoggedIn: boolean;
  setisLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setuser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
                                  isLoggedIn: false,
                                  setisLoggedIn: () => {},
                                  user: null,
                                  setuser: () => {},
                                  isLoading: true,
                                });
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children } : {children: React.ReactNode}) => {
   const [isLoggedIn, setisLoggedIn] = useState(false);
   const [user, setuser] = useState<any>(null);
   const [isLoading, setisLoading] = useState(true);

   useEffect(()=> {
     getCurrentUser()
     .then((res) => {
      if(res){
        setisLoggedIn(true);
        setuser(res);
      } else{
        setisLoggedIn(false)
        setuser(null);
      }
     })
     .catch((error) => {
      console.log(error);
     })
     .finally(()=> {
      setisLoading(false);
     })
   }, [])

   return (
    <GlobalContext.Provider value={{
        isLoggedIn,
        setisLoggedIn,
        user,
        setuser,
        isLoading
    }}>
      {children}
    </GlobalContext.Provider>
  )
};

export default GlobalProvider;