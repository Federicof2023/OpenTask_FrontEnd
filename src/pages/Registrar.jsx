import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    // detengo comportamiento por defecto //
    e.preventDefault();

    //********** */ VALIDACIONES DEL FORM *******************//

    //  valido que el usuario escriba algo en los imputs //
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios ",
        error: true,
      });
      return;
    }
    // valido que el usuario repita el mismo password en  confirmacion de password //
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los passwords no son iguales, ingreselo nuevamente ",
        error: true,
      });
      return;

    }
    // valido que ingrese minimo 6 caracteres //
    if (password.length < 6) {
      setAlerta({
        msg: "El password es demasiado corto, debe contener minimo 6 caracteres ",
        error: true,
      });

      return;
    }
    setAlerta({})

    // --------CREAR EL USUARIO EN LA API--------------------------//

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setPassword("");
      setEmail("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

  };

  const { msg } = alerta;

  // text-sky-700 font-black text-6xl capitalize text-center  - estilo original-//
  return (
    <>
      <h1 className=" text-5xl text-slate-800  text-center">Registrate.</h1>

      <Link
        className="block text-center my-5 text-slate-500  text-sm font-bold
            "
        to="/"
      >
        ¿Ya tenes una cuenta? Inicia sesion.
      </Link>

      <form
        className="my-8 bg-white shadow-lg rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-4">
          <label
            className=" text-gray-500 block text-sm font-bold"
            htmlFor="email"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className=" text-gray-500 block text-sm font-bold"
            htmlFor="password2"
          >
            Confirmar Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Confirmar Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-5"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear cuenta"
          className="bg-teal-600 w-full py-3 text-white  shadow-xl font-bold rounded-xl hover:bg-teal-800 hover:cursor-pointer transition-colors "
        />
      </form>
      {msg && <Alerta alerta={alerta} />}

      <nav className="lg:flex lg:justify-center">


        <Link className="  my-2  text-cyan-800  text-sm font-bold underline 
            "  to="/olvide-password"    >
          ¿Te Olvidadaste el password ?
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
