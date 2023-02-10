// Home Component
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IntraContext } from "../context/IntraContext";

import Layout from "../components/Layout";
import Card from "../components/Card";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, setData, token, userId } = useContext(IntraContext);

  const navigate = useNavigate();

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

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  }, [token, userId]);

  const [user] = data.filter((user) => user.id === userId);

  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setSelectedUser(data[randomIndex]);
  };

  token === "" ?? navigate("/login");

  return (
    <Layout>
      <div className="container mx-auto pt-36 h-full flex flex-col items-center gap-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-blue-500">
            Bienvenue
          </h2>
          {selectedUser ? (
            <Card userData={selectedUser} page="home" />
          ) : user ? (
            <Card userData={user} page="home" />
          ) : (
            <p>Loading...</p>
          )}
          <button
            onClick={handleButtonClick}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md w-full py-4"
          >
            Dire bonjour à quelqu'un d'autre
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
