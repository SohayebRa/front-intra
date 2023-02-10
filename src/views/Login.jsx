// APP Component
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IntraContext } from "../context/IntraContext";

import Layout from "../components/Layout";
import LoginForm from "../components/loginForm";

function Login() {
  const { token } = useContext(IntraContext);

  const navigate = useNavigate();

  token !== "" ?? navigate("/");

  return (
    <Layout>
      <div className="container mx-auto pt-36 h-full flex flex-col items-center gap-8">
        <h2 className="text-3xl font-bold text-slate-800">Se connecter</h2>
        <LoginForm />
      </div>
    </Layout>
  );
}

export default Login;
