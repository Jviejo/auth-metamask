import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (address) => {
    try {
      const response = await fetch(

        `${import.meta.env.VITE_BASE_URL}/api/auth/login/${address}`
      );
      // server response with token firmado por el server
      const token = await response.text();

      // sign token
      const signature = await signMessage(address, token);

      // if cancel sign with metamask
      if (!signature) {
        console.log("No signature");
        return;
      }
      // send address metamas y signatura
      // header with token
      const response2 = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login/${address}/${signature}`,
        {
          method: "GET",
          headers: {
            Autorization: `Bearer ${token}`,
          },
        }
      );
      // server response with a new token sesion
      const tokenSesion = await response2.text();
      const tokenDocoded = jwtDecode(tokenSesion);
      console.log(tokenSesion, tokenDocoded);
      const user = {
        tokenDocoded,
        tokenSesion,
        address,
      }
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      
      console.log("Connected", address);
    } catch (error) {
      console.error(error);
    }
  };

  const signMessage = async (account, message) => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("MetaMask is not installed.");
      return;
    }

    try {
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [message, account],
      });
      return signature;
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
  };

  const isAuthenticated = () => {
    return user != null;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
