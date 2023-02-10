// Add Component
import axios from "axios";
import { useEffect, useContext } from "react";
import { IntraContext } from "../context/IntraContext";

import Layout from "../components/Layout";
import EditForm from "../components/EditForm";

function Edit() {
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
            Modifier
          </h2>
        </div>
        <EditForm />
      </div>
    </Layout>
  );
}

export default Edit;
