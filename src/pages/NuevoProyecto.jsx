import FormProyecto from "../components/FormProyecto";

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-teal-800 "> Crear Proyecto</h1>

      <div className="mt-10 flex justify-center">
        <FormProyecto />
      </div>
    </>
  );
};

export default NuevoProyecto;

