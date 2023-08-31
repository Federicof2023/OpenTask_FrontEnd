import { createContext, useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate()  -> habilitar si quiero redireccionar al usuario a PROYECTOS directamente//

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);

        // navigate('/proyectos')  //<--- opcion para cuando si ya esta autenticado y tiene token valido  redirecciona al usuario a PROYECTOS directamente//
      } catch (error) {
        setAuth({});
      }

      setLoading(false);
    };
    autenticarUsuario();
  }, []);

  const LogOutAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        loading,
        LogOutAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
