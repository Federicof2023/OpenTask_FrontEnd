import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const OlvidoPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  // ****** OLVIDO DE PASSWORD , RECUPERAR PASSWORD ******** //

  // detengo comportamiento por defecto   //
  const handlesubmit = async (e) => {
    e.preventDefault();

    // valido que campo email de obligatorio//
    if (email === "" || email.length < 6) {
      setAlerta({
        // importo mi Alerta para enviar msg //
        msg: "El campo  email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      // hago la peticion para traerme el email para validarlo //

      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg, // si el email es valido se le envia msg: 'te enviamos un emael... '
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-5xl text-slate-700  text-center">Recupera tu contraseña</h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="my-10 bg-white shadow-lg rounded-lg p-10"
        onSubmit={handlesubmit}
      >
        <div className="my-5">
          <label
            className="text-gray-500 block text-sm font-bold"
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
        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-teal-600 w-full py-3 text-white shadow-xl  font-bold rounded-xl hover:bg-teal-800 hover:cursor-pointer transition-colors "
        />
      </form>
      <nav className="lg:flex lg:justify-center">
        <Link
          className="block text-center my-2  text-teal-600  text-sm font-bold underline hover:text-cyan-800
        "
          to="/"
        >
          ¿ Ya tenes una cuenta Inicia sesion?
        </Link>
        {/* 
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registar"
        >
          ¿No tienes una cuenta? Registrate
        </Link> */}
      </nav>
    </>
  );
};

export default OlvidoPassword;
