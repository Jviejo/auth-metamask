import { useEffect } from "react";

function Privada() {
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/ping", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>Privada</div>;
}

export default Privada;
