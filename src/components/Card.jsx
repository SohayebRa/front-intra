// Card Component
import clientAxios from "../services/axios";
import { useContext } from "react";
import { IntraContext } from "../context/IntraContext";

const Card = ({ userData, page }) => {
  const { token, data, setData, isAdmin } = useContext(IntraContext);

  const userAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const handleDelete = async (id) => {
    try {
      if (!isAdmin) {
        throw "Action not allowed!";
      }

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await clientAxios.delete(`/${id}`, config);
      if (response.status === 200) {
        setData(data.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const options = { day: "numeric", month: "long" };

  return (
    <div className="flex justify-center mt-10 ">
      <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white border-gray-300 border">
        <img
          className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={userData.photo}
          alt={userData.id}
        />
        <div className="p-6 pr-10 flex flex-col justify-start">
          <h5
            className={`${
              userData.is_admin ? "text-blue-500" : "text-gray-900"
            } text-xl font-bold mb-2`}
          >
            {userData.first_name + " " + userData.last_name}{" "}
            <span className="font-medium">
              ({userAge(userData.birthdate)} ans)
            </span>
          </h5>
          <p className="text-gray-600 text-base mb-4">
            {userData.city + ", " + userData.country}
          </p>
          <p className="text-gray-600 text-base mb-1 flex items-center gap-2">
            <i className="fa-solid fa-envelope text-blue-500"></i>
            {userData.email}
          </p>
          <p className="text-gray-600 text-base mb-1 flex items-center gap-2">
            <i className="fa-solid fa-phone text-blue-500"></i>
            {userData.phone}
          </p>
          <p className="text-gray-600 text-base mb-1 flex items-center gap-2">
            <i className="fa-solid fa-cake-candles text-red-600"></i>
            Anniversaire:{" "}
            {new Date(userData.birthdate).toLocaleDateString("fr", options)}
          </p>
          {page === "list" ? (
            <div className="flex gap-4 items-center mt-4">
              <p
                className={`text-white font-medium flex justify-center gap-2 py-1 w-1/2 ${
                  userData.category === "Marketing"
                    ? "bg-blue-400"
                    : userData.category === "Technique"
                    ? "bg-red-400"
                    : userData.category === "Client"
                    ? "bg-green-400"
                    : ""
                }`}
              >
                {userData.category}
              </p>
              {isAdmin ? (
                <div className="flex items-center h-full w-1/2 py-1 gap-2">
                  <a
                    href={`/edit/${userData.id}`}
                    className="bg-gray-700 hover:bg-gray-800 text-white text-center font-medium p-1 w-full"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </a>
                  <button
                    onClick={() => handleDelete(userData.id)}
                    className="bg-red-700 hover:bg-red-800 text-white text-center font-medium p-1 w-full"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
