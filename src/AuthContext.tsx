import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState, createContext, FC } from "react";
import { app, db } from "./firebase";

export type UserAuth = User | null;

type AuthContextProps = {
    user: UserAuth
  }

const AuthContext = createContext<Partial<AuthContextProps>>({})


export const AuthProvider: FC<{ children : ReactNode }> = ({ children }) => {
    const router = useRouter();
    const auth = getAuth(app);
    const [user, setUser] = useState<UserAuth>()
    const routing = 
        router.pathname === '/login' ||
        router.pathname === 'signup'
    // const value = {
    //     user,
    // }

    useEffect(() => {
        const authStateChanged = onAuthStateChanged(auth, async(user) => {
            console.log(user);
            setUser(user)
            !user && !routing && (await router.push('/signup'))
            if (user) {
              const usersRef = doc(db, 'users', user.uid);
              const usersSnap = await getDoc(usersRef);

              if (!usersSnap.exists()) {
                await setDoc(usersRef, {
                  screen_name: user.uid
                })
              }
            }

        return authStateChanged();
            
      })}, [])
      
      return (
        <AuthContext.Provider value={{user}}>
          {children}
        </AuthContext.Provider>
      )
    };
    
export const useAuthContext = () => {
  return useContext(AuthContext)
}