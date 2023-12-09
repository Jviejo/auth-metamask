import { useAuth } from "./Authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);
  return <div>Desconectado</div>;
}
