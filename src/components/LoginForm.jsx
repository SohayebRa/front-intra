// LoginForm Component
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IntraContext } from "../context/IntraContext";
import clientAxios from "../services/axios";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setToken, setUserId } = useContext(IntraContext);

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await clientAxios.post("/signin", user);

      // Put token in localstorage
      setToken(response.data.token);
      setUserId(response.data.userId);

      Swal.fire("Login Successfull", "You have been logged", "success");

      // redirect
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        type: "error",
        title: "There is an error",
        text: error,
      });
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="w-1/4">
      <form className="w-full flex flex-col item-center gap-4">
        <div className="group flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="ex: owen.lopez@example.com"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
          />
        </div>
        <div className="group flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
            className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
          />
        </div>
        <button
          onClick={onSubmit}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md py-4"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
