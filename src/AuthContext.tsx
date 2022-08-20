import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState, createContext } from "react";
import { app, db } from "./firebase";

export type UserType = User | null;
export type AuthContextProps = {
    user: UserType
  }
export type AuthProps = {
    children: ReactNode
  }


const AuthContext = createContext<Partial<AuthContextProps>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProps) => {
    const router = useRouter();
    const auth = getAuth(app);
    const [user, setUser] = useState<UserType>(null)
    const routing = 
        router.pathname === '/login' ||
        router.pathname === 'signup'
    const value = {
        user,
    }

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
        });
        return authStateChanged();
            
    }, [])

    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      )
};
