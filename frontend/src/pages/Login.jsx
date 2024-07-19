import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Recurso 221.png";

function Login() {
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      navigate("/homeSeller");
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#043F61] overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-blue-600 rounded-bl-[100%]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600 rounded-tr-[100%]"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-600 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
      <div className="bg-transparent p-8 z-10 w-80">
        <div className="flex justify-center mb-6">
          <img
            src={ logo }
            alt="OST Logo"
            className="w-24"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full p-2 bg-transparent border border-gray-300 rounded text-white"
              name="user"
              value={credentials.user}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 bg-transparent border border-gray-300 rounded text-white"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-[#043F61] p-2 rounded font-bold"
          >
            INGRESAR
          </button>
        </form>
        <div className="mt-4 text-end">
          <a href="#" className="text-white text-sm hover:text-gray-300">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
