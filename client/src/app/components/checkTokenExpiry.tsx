import { jwtDecode } from 'jwt-decode'

const checkTokenExpiry = (token: string) => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("accessToken");
            return true
        }
        return false;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Treat invalid tokens as expired
    }
}

export default checkTokenExpiry
