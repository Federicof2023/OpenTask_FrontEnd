import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;

    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      setAlerta({});
      localStorage.setItem("token", data.token);

      setAuth(data);
      navigate("/proyectos")
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-5xl font-sans text-center capitalize ">Inicia sesion</h1>
      <span className=" flex  justify-center  text-center  mt-5"> ¿No tienes una cuenta?</span>
      <Link className="block text-center my-5 text-slate-500  text-sm " to="/registrar">
        <span className="font-bold text-slate-600 underline  ">Registrate</span>
      </Link>



      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow-lg rounded-lg p-16"
        onSubmit={handlesubmit}
      >
        <div className="my-5">
          <label
            className=" text-gray-500 block text-sm font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className=" text-gray-500 block text-sm font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Introduce tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="inicia Sesion"
          className="bg-teal-600 w-full py-3 text-white shadow-xl  font-bold rounded-xl hover:bg-teal-800 hover:cursor-pointer transition-colors "
        />
      </form>
      <nav className="lg:flex lg:justify-center">


        <Link className="block text-center my-2  text-cyan-800  text-sm font-bold underline 
            "  to="/olvide-password"    >
          ¿ Olvidadaste el password ?
        </Link>


      </nav>
    </>
  );
};

export default Login;
