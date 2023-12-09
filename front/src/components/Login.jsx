import React, { useEffect } from "react";
import { useAuth } from "./Authentication";
import { useNavigate } from "react-router-dom";
const { ethereum } = window;
function Login() {
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuth();

  const [accounts, setAccounts] = React.useState(null);
  useEffect(() => {
    if (!ethereum) {
      console.log("MetaMask is not installed.");
      return;
    }
    ethereum.on("accountsChanged", (accounts) => {
      setAccounts(accounts[0]);
    });
    (async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts[0]);
    })();
  }, []);
  async function handleLogin() {
    await login(accounts);
  }
  useEffect(() => {
    console.log(user)
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <div className="border w-75 h-25 align-self-center">
      {accounts ? (
        <div className="p-5 text-center d-flex flex-column justify-content-center">
          <div className="">{accounts}</div>
          <button className="btn  btn-primary" onClick={() => handleLogin()}>
            LOGIN
          </button>
        </div>
      ) : (
        <p>NO HAY CUENTA</p>
      )}
      <p>{isAuthenticated() ? JSON.stringify(user, null, 4) : ""}</p>
    </div>
  );
}

export default Login;
