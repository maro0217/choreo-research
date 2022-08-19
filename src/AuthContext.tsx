import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState, createContext } from "react";
import { app } from "./firebase";

export type AuthContextProps = {
    user: UserType
  }

export type UserType = User | null;

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
            setUser(user)
            !user && !routing && (await router.push('/login'))
        })
        return () => {
            authStateChanged()
        }
    }, [])

    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      )
};
