









import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/UseAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const admin = useAdmin();

  const { descripcion, nombre, fechadeEntrega, prioridad, estado, _id } = tarea;
  // console.log(tarea);
  return (
    <div className=" flex  border-b  p-5  justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="text-xl mb-2  font-semibold"> {nombre}</p>
        <p className="text-sm text-teal-600  mb-2">{descripcion}</p>
        <p className="text-sm mb-2 ">
          {formatearFecha(fechadeEntrega)}
        </p>
        <p className="text-xl mb-1 text-emerald-700">Prioridad : {prioridad}</p>
        {estado && <p className="text-sm  uppercase p-2 mt-2 rounded-md text-white bg-teal-700 shadow-md">Completado por : {tarea.completado.nombre}</p>}
      </div>



      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-teal-800 px-4 py-3 text-white uppercase font-bold rounded-md shadow-md  text-sm
        hover:bg-teal-900 cursor-pointer transition-colors"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          className={`${estado ? "bg-emerald-600 shadow-md" : "bg-slate-700 shadow-md"
            } px-4 py-3 text-white uppercase font-bold rounded-md  text-sm
            hover:bg-slate-600 cursor-pointer transition-colors`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "completa" : "incompleta"}
        </button>

        {admin && (
          <button
            className="bg-red-500 px-4 py-3 text-white uppercase font-bold rounded-md  text-sm shadow-md  hover:bg-red-700 cursor-pointer transition-colors"
            onClick={() => handleModalEliminarTarea(tarea)}
          >Eliminar</button>
        )}
      </div>
    </div>
  );
};

export default Tarea;










































































// import { formatearFecha } from "../helpers/formatearFecha"
// import useProyectos from "../hooks/useProyectos"
// import useAdmin from "../hooks/useAdmin"

// const Tarea = ({ tarea }) => {

//   const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()
//   const admin = useAdmin()

//   const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea

//   return (
//     <div className="border-b p-5 flex justify-between items-center">
//       <div className="flex flex-col  items-start">
//         <p className="mb-1 text-xl">{nombre}</p>
//         <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
//         <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
//         <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
//         {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
//       </div>

//       <div className="flex flex-col lg:flex-row gap-2">
//         {admin && (
//           <button
//             className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
//             onClick={() => handleModalEditarTarea(tarea)}
//           >Editar</button>

//         )}

//         <button
//           className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
//           onClick={() => completarTarea(_id)}
//         >{estado ? 'Completa' : 'Incompleta'}</button>

//         {admin && (
//           <button
//             className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
//             onClick={() => handleModalEliminarTarea(tarea)}
//           >Eliminar</button>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Tarea









































