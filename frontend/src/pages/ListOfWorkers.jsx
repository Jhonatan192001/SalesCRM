import { useState, useEffect } from "react";
import UserItem from "../components/UserItem";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  addWorker,
  getWorkers,
  updateWorker,
  deleteWorker,
} from "../services/workerService";
import Toast from "../components/Toast";

const ListOfWorkers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [editingWorker, setEditingWorker] = useState(null);
  const [workerData, setWorkerData] = useState({
    tip_doc: "",
    trab_dni: "",
    trab_nombres: "",
    trab_apellidos: "",
    trab_fecha_nacimiento: "",
    trab_email: "",
    trab_telefono1: "",
    trab_telefono2: "",
    trab_direccion: "",
    trab_sede: "",
    idRol: "",
    trab_sueldo: "",
    trab_comision: "",
    trab_estado: "activo",
    user: "",
    password: "",
    repetirContrasena: "",
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

  const openModal = (worker = null) => {
    if (worker) {
      setEditingWorker(worker);
      setWorkerData({
        ...worker,
        password: "",
        repetirContrasena: "",
      });
    } else {
      setEditingWorker(null);
      setWorkerData({
        ...workerData,
        trab_estado: "activo",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWorker(null);
    setWorkerData({
      tip_doc: "",
      trab_dni: "",
      trab_nombres: "",
      trab_apellidos: "",
      trab_fecha_nacimiento: "",
      trab_email: "",
      trab_telefono1: "",
      trab_telefono2: "",
      trab_direccion: "",
      trab_sede: "",
      idRol: "",
      trab_sueldo: "",
      trab_comision: "",
      trab_estado: "activo",
      user: "",
      password: "",
      repetirContrasena: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkerData({ ...workerData, [name]: value });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "tip_doc",
      "trab_dni",
      "trab_nombres",
      "trab_apellidos",
      "trab_direccion",
      "trab_telefono1",
      "trab_email",
      "idRol",
      "trab_sueldo",
      "trab_sede",
      "user",
      "password",
    ];

    const missingFields = requiredFields.filter((field) => !workerData[field]);

    if (missingFields.length > 0) {
      showToast(
        `Por favor, complete los siguientes campos: ${missingFields.join(
          ", "
        )}`,
        "error"
      );
      return;
    }

    if (
      !editingWorker &&
      workerData.password !== workerData.repetirContrasena
    ) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }

    try {
      if (editingWorker) {
        const updatedWorker = await updateWorker(
          editingWorker.trab_id,
          workerData
        );
        setWorkers(
          workers.map((w) =>
            w.trab_id === updatedWorker.trab_id ? updatedWorker : w
          )
        );
        showToast("Trabajador actualizado correctamente", "success");
      } else {
        const newWorker = await addWorker(workerData);
        setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
        showToast("Trabajador agregado correctamente", "success");
      }
      closeModal();
    } catch (error) {
      console.error("Error saving worker:", error);
      showToast(
        `Error al ${editingWorker ? "actualizar" : "agregar"} el trabajador: ${
          error.message
        }`,
        "error"
      );
    }
  };

  const handleDelete = async (workerId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este trabajador?")) {
      try {
        await deleteWorker(workerId);
        setWorkers(workers.filter((w) => w.trab_id !== workerId));
        showToast("Trabajador eliminado correctamente", "success");
      } catch (error) {
        console.error("Error deleting worker:", error);
        showToast("Error al eliminar el trabajador", "error");
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-7xl mx-auto pb-9">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Button
            text="Añadir trabajador"
            icon={faUserPlus}
            color="red"
            onClick={() => openModal()}
            className="px-4 py-2 rounded-md"
          />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {workers.map((worker) => (
          <UserItem
            key={worker.trab_id}
            worker={worker}
            onEdit={() => openModal(worker)}
            onDelete={() => handleDelete(worker.trab_id)}
          />
        ))}
      </div>
      {workers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay trabajadores registrados.
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingWorker ? "Editar trabajador" : "Nuevo trabajador"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Tipo Documento"
              type="select"
              name="tip_doc"
              value={workerData.tip_doc}
              onChange={handleInputChange}
              options={[
                { value: "dni", label: "DNI" },
                { value: "ce", label: "Carné de Extranjería" },
              ]}
              placeholder="Seleccione el tipo de documento"
              className="w-full"
              required
            />
            <Input
              label="DNI/CE"
              type="text"
              name="trab_dni"
              value={workerData.trab_dni}
              onChange={handleInputChange}
              placeholder="Ingrese el DNI o CE"
              className="w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Nombres"
              type="text"
              name="trab_nombres"
              value={workerData.trab_nombres}
              onChange={handleInputChange}
              placeholder="Ingrese el nombre completo"
              className="w-full"
              required
            />
            <Input
              label="Apellidos"
              type="text"
              name="trab_apellidos"
              value={workerData.trab_apellidos}
              onChange={handleInputChange}
              placeholder="Ingrese apellido completo"
              className="w-full"
              required
            />
            <Input
              label="Fecha de Nacimiento"
              type="date"
              name="trab_fecha_nacimiento"
              value={workerData.trab_fecha_nacimiento}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Email"
              type="email"
              name="trab_email"
              value={workerData.trab_email}
              onChange={handleInputChange}
              placeholder="ejm. empleado@gmail.com"
              className="w-full"
              required
            />
            <Input
              label="N° Celular"
              type="tel"
              name="trab_telefono1"
              value={workerData.trab_telefono1}
              onChange={handleInputChange}
              placeholder="Ingrese el número celular"
              className="w-full"
              required
            />
            <Input
              label="N° telefónico (opcional)"
              type="tel"
              name="trab_telefono2"
              value={workerData.trab_telefono2}
              onChange={handleInputChange}
              placeholder="Ingrese el número telefónico"
              className="w-full"
            />
          </div>

          <Input
            label="Dirección"
            type="text"
            name="trab_direccion"
            value={workerData.trab_direccion}
            onChange={handleInputChange}
            placeholder="Ingrese la dirección"
            className="w-full"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Sede de Trabajo"
              type="text"
              name="trab_sede"
              value={workerData.trab_sede}
              onChange={handleInputChange}
              placeholder="Ingrese la sede de trabajo"
              className="w-full"
              required
            />
            <Input
              label="Rol"
              type="select"
              name="idRol"
              value={workerData.idRol}
              onChange={handleInputChange}
              options={[
                { value: 1, label: "Administrador" },
                { value: 2, label: "Vendedor" },
              ]}
              placeholder="Seleccione el rol del trabajador"
              className="w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Sueldo"
              type="number"
              name="trab_sueldo"
              value={workerData.trab_sueldo}
              onChange={handleInputChange}
              placeholder="Ingrese el sueldo"
              className="w-full"
              required
            />
            <Input
              label="Comisión"
              type="number"
              name="trab_comision"
              value={workerData.trab_comision}
              onChange={handleInputChange}
              placeholder="Ingrese la comisión"
              className="w-full"
            />
            <Input
              label="Estado de actividad"
              type="select"
              name="trab_estado"
              value={workerData.trab_estado}
              onChange={handleInputChange}
              options={[
                { value: "activo", label: "Activo" },
                { value: "inactivo", label: "Inactivo" },
                { value: "suspendido", label: "Suspendido" },
              ]}
              placeholder="Seleccione el estado de actividad"
              className="w-full"
              disabled={!editingWorker}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Usuario"
              type="text"
              name="user"
              value={workerData.user}
              onChange={handleInputChange}
              placeholder="Ingrese el usuario"
              className="w-full"
              required
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={workerData.password}
              onChange={handleInputChange}
              placeholder="Ingrese la contraseña"
              className="w-full"
              required={!editingWorker}
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              name="repetirContrasena"
              value={workerData.repetirContrasena}
              onChange={handleInputChange}
              placeholder="Repita la contraseña"
              className="w-full"
              required={!editingWorker}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button
              text={editingWorker ? "Actualizar" : "Registrar"}
              color="blue"
              type="submit"
              className="px-6 py-2 rounded-md"
            />
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
