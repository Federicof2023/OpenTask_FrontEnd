import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";

const Header = () => {
  const { logOutProyectos } = useProyectos();
  const { LogOutAuth } = useAuth();

  const handleLogOut = () => {
    logOutProyectos();
    LogOutAuth();
    localStorage.removeItem("token");
  };

  return (
    <header className="sticky top-0 z-30 w-full px-2 py-4 bg-white sm:px-4 shadow-xl">
      <div className="md:flex md:justify-between   ">
        <div className="flex justify-between items-center gap-2  ">
          {/* <img className="w-6 " src="/images/imagen1.png" /> */}
          <h2
            className="text-3xl text-zinc-800  font-black  text-center 
        transition-colors mb-5 md:mb-0    "
          >
            OpenTask
          </h2>
        </div>

        <Busqueda />

        <div className=" flex flex-col md:flex-row items-center gap-5">


          <button
            type="button"
            className="text-white text-sm bg-teal-700 p-3   font-bold
             hover:bg-teal-800 transition-colors shadow-md rounded-md"
            onClick={handleLogOut}
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
