import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviaProyecto from "../components/PreviaProyecto";
import Alerta from "../components/Alerta";


const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();




  const { msg } = alerta

  return (
    <>
      <div className="flex gap-4 ">
        <div>
          <h1 className="text-4xl font-bold text-teal-800">Proyectos:</h1>
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg  ">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviaProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="mt-5 text-center     text-gray-500 uppercase p-5  ">
            No hay proyectos cargados todavia...
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
