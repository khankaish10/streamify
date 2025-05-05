'use client'
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthProtection = <P extends object>(Component: React.ComponentType<P>) => {
    const AuthenticatedComponent:React.FC<P> = (props) => {


      const router = useRouter();

      useEffect(() => {
        const token = localStorage.getItem('user')
        if(!token) {
          router.replace("/auth/login")
        }
      },[])

      return <Component {...props} />
    }

    return AuthenticatedComponent
}


export default AuthProtection