import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechadeEntrega, setFechadeEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams()
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  useEffect(() => {
    if (params.id) {  // optional chainning // 
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechadeEntrega(proyecto.fechadeEntrega?.split('T')[0]); //<-- clase 500 min 5
      setCliente(proyecto.cliente);
    }
  }, [params])



  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechadeEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Pasar los datos hacia el provider //
    await submitProyecto({ id, nombre, descripcion, fechadeEntrega, cliente });

    setId(null)
    setNombre('')
    setDescripcion('')
    setFechadeEntrega('')
    setCliente('')

  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow "
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="nombre"
        >
          Nombre Proyecto
        </label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="descripcion"
        >
          Descripcion
        </label>

        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Escribe una descripcion del proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)} // -> modificador del state//
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="fecha-entrega"
        >
          Fecha de entrega
        </label>

        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechadeEntrega}
          onChange={(e) => setFechadeEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="cliente"
        >
          Cliente
        </label>

        <input
          id="cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Escriba el nombre del Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? 'Actualizar proyecto' : 'Agregar  proyecto'}
        className="w-full text-white text-sm bg-teal-700 p-3 rounded-md uppercase font-bold
        hover:bg-teal-800  cursor-pointer transition-colors"
      />
    </form>
  );
};

export default FormProyecto;
