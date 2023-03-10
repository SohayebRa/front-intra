// Layout Component
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IntraContext } from "../context/IntraContext";

const Layout = ({ children }) => {
  const { token, setToken, setUserId, isAdmin, setIsAdmin } =
    useContext(IntraContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setToken("");
    setUserId("");
    setIsAdmin(false);
  };

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <div className="bg-slate-800 w-full flex items-center justify-between h-[8%]">
          <a href="/" className="font-extrabold text-white px-10">
            INTRANET.
          </a>
          {token ? (
            <div className="flex h-full">
              <a
                href="/list"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium h-full px-12 flex gap-3 items-center"
              >
                <i className="fa-solid fa-list"></i>
                Liste
              </a>
              {isAdmin ? (
                <a
                  href="/add"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-full px-12 flex gap-3 items-center"
                >
                  <i className="fa-solid fa-plus"></i>
                  Ajouter
                </a>
              ) : null}
              <a
                onClick={handleLogout}
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium h-full px-12 flex gap-3 items-center"
              >
                <i className="fa-solid fa-power-off"></i>
                Se déconnecter
              </a>
            </div>
          ) : (
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium h-full px-12 flex gap-3 items-center"
            >
              <i className="fa-solid fa-user"></i>
              Se connecter
            </a>
          )}
        </div>
        <div className="h-[92%]">{children}</div>
      </div>
    </>
  );
};

export default Layout;
