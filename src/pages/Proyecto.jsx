import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import ModalFormTarea from "../components/ModalFormTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import useAdmin from "../hooks/UseAdmin";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import io from "socket.io-client";

let socket;

const Proyecto = () => {
  const params = useParams();
  const {
    obtenerProyecto,
    proyecto,
    loading,
    handleModalTarea,
    alerta,
    submitTareasProyecto,
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    actualizarEstadoTarea,
  } = useProyectos();

  const admin = useAdmin();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("open proyect", params.id);
  }, []);

  useEffect(() => {
    socket.on("tarea incluida", (nuevaTarea) => {
      if (nuevaTarea.proyecto === proyecto._id) {
        submitTareasProyecto(nuevaTarea);
      }
    });

    socket.on("tarea eliminada", (tareaEliminada) => {
      // if (tareaEliminada.proyecto === proyecto._id) {
      //   eliminarTareaProyecto(tareaEliminada)
      // }
      const proyectoValue = tareaEliminada.proyecto;

      if (typeof proyectoValue === "string") {
        if (proyectoValue === proyecto._id) {
          eliminarTareaProyecto(tareaEliminada);
        }
      } else if (typeof proyecto === "object") {
        if (proyectoValue._id === proyecto._id) {
          eliminarTareaProyecto(tareaEliminada);
        }
      }
    });

    socket.on("tarea actualizada", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada);
      }
    });

    socket.on("estado actualizado", (estadoTareaActual) => {
      if (estadoTareaActual.proyecto._id === proyecto._id) {
        actualizarEstadoTarea(estadoTareaActual);
      }
    });
  });

  const { nombre } = proyecto;

  // console.log(proyecto);

  //TODO :  REVISAR DESPUES poner UN COMPONENT PARA EL SPINNER ACA //

  // console.log(proyecto);
  // console.log(admin);
  const { msg } = alerta;

  if (loading)
    // spinner
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-900"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );

  // si me retorna un msg  dispara la alerta  sino  me devuelve el resto de la pantalla//
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-teal-800 text-4xl ">{nombre}</h1>

        {admin && ( //  restringir el  boton EDITAR  solo para  el ADMIN //
          <div className="flex items-center  text-teal-600 hover:text-teal-800 font-bold gap-2 p-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897
             1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>

            <Link to={`/proyectos/editar/${params.id}`} className="font-bold">
              Editar proyecto
            </Link>
          </div>
        )}
      </div>

      {admin && (
        <button
          onClick={handleModalTarea}
          type="button"
          className="bg-teal-600  flex items-center gap-2  justify-center hover:bg-teal-700  
          text-white uppercase font-bold text-sm rounded-lg p-2 mt-5 
        text-center transition-colors md:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Nueva tarea
        </button>
      )}

      <div className="flex  gap-3">
        <p className="  font-bold text-2xl text-teal-700 mt-10 ">
          Tareas del Proyecto :{" "}
        </p>
      </div>

      <div className="flex justify-center ">
        <div className=" w-full   md:w-1/3 lg:w-1/4 ">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>

      <div className="bg-white shadow mt-10 p-5 rounded-lg text-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-ceneter my-5 p-10">
            Noy hay tareas agendadas para este proyecto aun...
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex justify-between  mt-10">
            <p className="font-bold text-xl text-teal-700 ">Colaboradores : </p>
            <div className="flex items-center gap-2  text-teal-600 hover:text-teal-800 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <Link
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className=" flex items-center text-teal-600  font-bold
            hover:text-teal-800"
              >
                Agregar
              </Link>
            </div>
          </div>

          <div className="bg-white shadow mt-10 p-5 rounded-lg text-lg">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores?.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-ceneter my-5 p-10">
                Noy hay colaboradores asignados a este proyecto aun... 😲
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};

export default Proyecto;
