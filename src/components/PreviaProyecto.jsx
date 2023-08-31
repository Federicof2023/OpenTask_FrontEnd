import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviaProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto;

  return (
    <div className=" border-b p-5 flex flex-col md:flex-row  justify-between ">
      <div className="flex items-center gap-4">
        <p className="flex-1 ">
          <span className="text-lg">  {nombre}  </span>


          <span className="text-sm text-teal-600  pl-3 font-bold">

            {cliente}
            {""}
          </span>
        </p>

        {auth._id !== creador ? (
          <p className=" text-white border uppercase bg-slate-400 text-sm  p-1 rounded-md shadow-lg ">Colaborador</p>
        ) : (<p className=" text-white uppercase bg-cyan-700 border  p-1  text-sm rounded-md shadow-lg ">Admin</p>)

        }

        {/* {auth._id !== creador && (
          <p className="font-bold  border p-1 rounded-xl uppercase px-1 text-sm bg-slate-400 text-slate-200">
            Colaborador
          </p>
        )} */}
      </div>

      <Link
        to={`${_id}`}
        className="text-teal-900 text-sm  hover:text-teal-600 underline flex  text-center gap-3 items-center font-bold"
      >
        Ver proyecto
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

      </Link>
    </div>
  );
};

export default PreviaProyecto;
