// List Component
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IntraContext } from "../context/IntraContext";

import Layout from "../components/Layout";
import Card from "../components/Card";

function List() {
  const { data, setData, token, userId } = useContext(IntraContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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
    if (data) {
      const user = data.find((user) => user.id === userId);
      if (user && user.is_admin) {
        setIsAdmin(true);
      }
    }
  }, [data, userId]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const categories = [...new Set(data.map((user) => user.category))];
  const cities = [...new Set(data.map((user) => user.city))];

  const filteredData = data.filter(
    (user) =>
      (selectedCategory === "" || user.category === selectedCategory) &&
      (selectedCity === "" || user.city === selectedCity) &&
      (user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  token === "" ?? navigate("/login");

  return (
    <Layout>
      <div className="container mx-auto pt-36 h-full flex flex-col items-center gap-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-blue-500">
            Listes des collaborateurs
          </h2>
          <div className="flex justify-between items-center mt-8">
            <input
              type="text"
              placeholder="Search by Name"
              className="bg-white border border-gray-400 rounded px-4 py-2 placeholder:font-medium"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <div className="flex gap-6">
              <select
                className="bg-white border border-gray-400 rounded px-4 py-2"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="bg-white border border-gray-400 rounded px-4 py-2"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Villes</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredData ? (
              filteredData.map((user) => (
                <div key={user.id} className="col-span-1">
                  <Card userData={user} page="list" isAdmin={isAdmin} />
                </div>
              ))
            ) : (
              <Navigate to={"/login"} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default List;
