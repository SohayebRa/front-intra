import { useState, useEffect, createContext } from "react";

const IntraContext = createContext();

const IntraProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") ?? "");
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") ?? false
  );

  return (
    <IntraContext.Provider
      value={{
        data,
        setData,
        token,
        setToken,
        userId,
        setUserId,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </IntraContext.Provider>
  );
};

export { IntraContext, IntraProvider };
