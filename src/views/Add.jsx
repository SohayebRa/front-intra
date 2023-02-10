// Add Component
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IntraContext } from "../context/IntraContext";

import Layout from "../components/Layout";
import AddForm from "../components/AddForm";

function Add() {
  const { setData, token } = useContext(IntraContext);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const result = await axios.get("http://localhost:8000/", config);
      setData(result.data);
    };
    fetchData();
  }, [token]);

  return (
    <Layout>
      <div className="container mx-auto pt-36 h-full flex flex-col items-center gap-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-blue-500">
            Ajouter des collaborateurs
          </h2>
        </div>
        <AddForm />
      </div>
    </Layout>
  );
}

export default Add;
