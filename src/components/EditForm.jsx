// EditForm Component
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IntraContext } from "../context/IntraContext";
import clientAxios from "../services/axios";
import Swal from "sweetalert2";

const EditForm = () => {
  const [credentials, setCredentials] = useState({});
  const { token } = useContext(IntraContext);
  const [user, setUser] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
    city: "",
    country: "",
    photo: "",
    category: "",
    isAdmin: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await clientAxios.get(`/${id}`, config);
      console.log(response.data);

      const userData = {
        gender: response.data.gender,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
        password: "",
        phone: response.data.phone.replace(/[^\d]/g, ""),
        birthdate: response.data.birthdate,
        city: response.data.city,
        country: response.data.country,
        photo: response.data.photo,
        category: response.data.category,
        isAdmin: response.data.is_admin,
      };

      setUser(userData);
    } catch (error) {
      console.log(error);
      Swal.fire({
        type: "error",
        title: "There is an error",
        text: error,
      });
    }
  };

  const updateUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await clientAxios.put(`/${id}`, user, config);
      console.log(response);

      Swal.fire("Edited Successfully", "You have edited the user", "success");

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

  return (
    <div className="w-2/6">
      <form className="w-full flex flex-col item-center gap-4">
        <div className="flex gap-2">
          <div className="group flex flex-col gap-1 w-full">
            <label htmlFor="gender">Civilité</label>
            <select
              id="gender"
              value={user.gender}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            >
              <option value="">Civilité</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          </div>
          <div className="group flex flex-col gap-1 w-full">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              value={user.category}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            >
              <option value="" disabled>
                Catégorie
              </option>
              <option value="Marketing">Marketing</option>
              <option value="Client">Client</option>
              <option value="Technique">Technique</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="group flex flex-col gap-1">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              placeholder="Prénom"
              value={user.firstName}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
          <div className="group flex flex-col gap-1">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              placeholder="Nom"
              value={user.lastName}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="group flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Ex: owen.lopez@example.com"
              value={user.email}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
          <div className="group flex flex-col gap-1">
            <label htmlFor="phone">Téléphone</label>
            <input
              type="number"
              id="phone"
              placeholder="+33 x xx xx xx xx"
              value={user.phone}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="group flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
          <div className="group flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirmer Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmer Password"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
        </div>
        <div className="group flex flex-col gap-1">
          <label htmlFor="birthdate">Date de naissance</label>
          <input
            type="date"
            id="birthdate"
            placeholder="Date de naissance"
            value={user.birthdate}
            onChange={handleChange}
            className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
          />
        </div>
        <div className="flex gap-2">
          <div className="group flex flex-col gap-1">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              placeholder="Toulouse"
              value={user.city}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
          <div className="group flex flex-col gap-1">
            <label htmlFor="country">Pays</label>
            <input
              type="text"
              id="country"
              placeholder="France"
              value={user.country}
              onChange={handleChange}
              className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
            />
          </div>
        </div>
        <div className="group flex flex-col gap-1">
          <label htmlFor="photo">Photo URL</label>
          <input
            type="url"
            id="photo"
            placeholder="Ex: https://randomuser.me/api/portraits/men/42.jpg"
            value={user.photo}
            onChange={handleChange}
            className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md py-4"
        >
          Modifier
        </button>
      </form>
    </div>
  );
};

export default EditForm;
