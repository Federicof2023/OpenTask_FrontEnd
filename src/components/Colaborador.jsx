import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
  const { handleModalEliminarColaborador } = useProyectos();

  const { email, nombre } = colaborador;

  return (
    <div className="p-2 flex justify-between border-b ">
      <div className="  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <p className="font-bold "> {nombre}</p>
        <p className=" text-sm  italic font-semibold text-teal-700 mt-1 ">{" "}{email}</p>

      </div>

      <div className="">
        <button
          className="bg-red-500  flex  gap-2  hover:bg-red-700  
                     text-white  font-bold text-sm rounded-lg p-2 mt-5 
                     text-center transition-colors md:w-auto"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
