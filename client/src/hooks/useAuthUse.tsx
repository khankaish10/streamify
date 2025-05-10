import { useMemo } from "react";

const useAuthUser = () => {
    return useMemo(() => {
        try {
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                return JSON.parse(storedUser)._id
            }
        } catch (error) {
            console.error("failed to parse user from localstorage:", error)
        }
        return null;
    }, [])
}

export default useAuthUser;