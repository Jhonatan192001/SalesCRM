import { useState, useEffect } from "react";
import UserItem from "../components/UserItem";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { addWorker, getWorkers } from "../services/workerService";
import Toast from "../components/Toast";

const ListOfWorkers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({
    dni: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    email: "",
    celular: "",
    sede: "",
    rol: "",
    comision: "",
    usuario: "",
    contrasena: "",
    repetirContrasena: ""
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const workersData = await getWorkers();
      setWorkers(workersData);
    } catch (error) {
      console.error("Error fetching workers:", error);
      showToast("Error al cargar los trabajadores", "error");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newWorker.contrasena !== newWorker.repetirContrasena) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }
    try {
      await addWorker(newWorker);
      closeModal();
      fetchWorkers();
      showToast("Trabajador agregado correctamente", "success");
    } catch (error) {
      console.error("Error adding worker:", error);
      showToast("Error al agregar el trabajador", "error");
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="p-5">
        <Button
          text="Añadir trabajador"
          icon={faUserPlus}
          color="red"
          onClick={openModal}
        />
      </div>
      {workers.map((worker) => (
        <UserItem key={worker.trab_id} user={worker} />
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Nuevo trabajador"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="DNI/CE"
            type="text"
            name="dni"
            value={newWorker.dni}
            onChange={handleInputChange}
            placeholder="Ingrese el DNI o CE"
          />
          <Input
            label="Nombres"
            type="text"
            name="nombres"
            value={newWorker.nombres}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre completo"
          />
          <Input
            label="Apellido Paterno"
            type="text"
            name="apellido_paterno"
            value={newWorker.apellido_paterno}
            onChange={handleInputChange}
            placeholder="Ingrese el apellido paterno"
          />
          <Input
            label="Apellido Materno"
            type="text"
            name="apellido_materno"
            value={newWorker.apellido_materno}
            onChange={handleInputChange}
            placeholder="Ingrese el apellido materno"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={newWorker.email}
            onChange={handleInputChange}
            placeholder="ejm. empleado@gmail.com"
          />
          <Input
            label="Celular"
            type="tel"
            name="celular"
            value={newWorker.celular}
            onChange={handleInputChange}
            placeholder="Ingrese el número celular"
          />
          <Input
            label="Sede"
            type="text"
            name="sede"
            value={newWorker.sede}
            onChange={handleInputChange}
          />
          <Input
            label="Rol"
            type="select"
            name="rol"
            value={newWorker.rol}
            onChange={handleInputChange}
            options={[
              { value: 1, label: "Administrador" },
              { value: 2, label: "Vendedor" },
            ]}
            placeholder="Seleccione el rol del trabajador"
          />
          <Input
            label="Comisión"
            type="number"
            name="comision"
            value={newWorker.comision}
            onChange={handleInputChange}
            placeholder="Ingrese la comisión"
          />
          <Input
            label="Usuario"
            type="text"
            name="usuario"
            value={newWorker.usuario}
            onChange={handleInputChange}
            placeholder="Ingrese el usuario"
          />
          <Input
            label="Contraseña"
            type="password"
            name="contrasena"
            value={newWorker.contrasena}
            onChange={handleInputChange}
            placeholder="Ingrese la contraseña"
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            name="repetirContrasena"
            value={newWorker.repetirContrasena}
            onChange={handleInputChange}
            placeholder="Repita la contraseña"
          />
          <div className="col-span-full flex justify-end mt-4">
            <Button text="Registrar" color="blue" type="submit" />
          </div>
        </form>
      </Modal>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default ListOfWorkers;