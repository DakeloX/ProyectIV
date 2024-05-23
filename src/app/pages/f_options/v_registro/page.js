"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "@/app/styles/registerV.module.css";
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function RegisterVehiculo() {

    const { data: session } = useSession();
    const idFundacion = session?.user?.idUser;
    //console.log(fundacion);


    const [formData, setFormData] = useState({
        numero_placa: '',
        tipo_vehiculo: '',
        capacidad: '',
        propietario: ''
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [propietarioData, setPropietarioData] = useState({
        numero_identificacion: '',
        nombre: ''
    });

    const [propietarios, setPropietarios] = useState([]);

    useEffect(() => {
        const fetchPropietarios = async () => {
            try {
                const response = await axios.get('/api/v_registro/GetPropietarios');
                setPropietarios(response.data);
            } catch (error) {
                console.error('Error al obtener los propietarios:', error);
                toast.error('Error al obtener los propietarios. Por favor, intenta de nuevo.', { autoClose: false });
            }
        };

        fetchPropietarios();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/v_registro', { ...formData, idFundacion });
            console.log('Registro exitoso:', response.data);
            toast.success('¡Registro de vehículo exitoso! Bienvenido.', { autoClose: false });
            setFormData({
                numero_placa: '',
                tipo_vehiculo: '',
                capacidad: '',
                propietario: ''
            });
        } catch (error) {
            console.error('Error al registrar vehículo:', error);
            toast.error('Error al registrar vehículo. Por favor, intenta de nuevo.', { autoClose: false });
        }
    };

    const handlePropietarioSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/v_registro/propietarioV', { ...propietarioData, idFundacion });
            console.log('Propietario registrado exitosamente:', response.data);
            toast.success('¡Registro de propietario exitoso! Puedes seleccionar el nuevo propietario en la lista.', { autoClose: false });
            setPropietarioData({ numero_identificacion: '', nombre: '' });
            setModalVisible(false);
            const updatedPropietarios = await axios.get('/api/v_registro/GetPropietarios');
            setPropietarios(updatedPropietarios.data);
        } catch (error) {
            console.error('Error al registrar propietario:', error);
            toast.error('Error al registrar propietario. Por favor, intenta de nuevo.', { autoClose: false });
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.columns}>
                    <div className={styles.imageColumn}>
                        <Link href='/pages/f_options/v_registro/adminV' className={styles.link}>
                            <div className={styles.card}>
                                <div className={styles.imageItem}>
                                    <Image src="/img/vehiculos.png" alt="Administrar Vehiculos" width={250} height={250} className={styles.image} />
                                    <p className={styles.imageText}>Administrar Vehículos</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.contentColumn}>
                        <div className={styles.contentWrapper}>
                            <section className={styles.registrationContainer}>
                                <h1 className={styles.registrationTitle}>Registro de Vehículo</h1>
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <label htmlFor="numero_placa" className={styles.organizationLabel}>
                                        Número de Placa
                                    </label>
                                    <input
                                        type="text"
                                        id="numero_placa"
                                        name="numero_placa"
                                        value={formData.numero_placa}
                                        onChange={(e) => setFormData({ ...formData, numero_placa: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Número de Placa."
                                        required
                                    />
                                    <label htmlFor="tipo_vehiculo" className={styles.organizationLabel}>
                                        Tipo de Vehículo
                                    </label>
                                    <input
                                        type="text"
                                        id="tipo_vehiculo"
                                        name="tipo_vehiculo"
                                        value={formData.tipo_vehiculo}
                                        onChange={(e) => setFormData({ ...formData, tipo_vehiculo: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Tipo de Vehículo."
                                        required
                                    />
                                    <label htmlFor="capacidad" className={styles.organizationLabel}>
                                        Capacidad (kg)
                                    </label>
                                    <input
                                        type="number"
                                        id="capacidad"
                                        name="capacidad"
                                        value={formData.capacidad}
                                        onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Capacidad"
                                        required
                                    />
                                    <label htmlFor="propietario" className={styles.organizationLabel}>
                                        Propietario
                                    </label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            id="propietario"
                                            name="propietario"
                                            value={formData.propietario}
                                            onChange={(e) => setFormData({ ...formData, propietario: e.target.value })}
                                            className={styles.inputField}
                                            aria-label="Propietario."
                                            required
                                        >
                                            <option value="">Asigne un propietario</option>
                                            {propietarios.map((propietario_vehiculo) => (
                                                <option key={propietario_vehiculo.id_propietario} value={propietario_vehiculo.id_propietario}>
                                                    {propietario_vehiculo.id_propietario} - {propietario_vehiculo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        <button type="button" className={styles.addButton} onClick={() => setModalVisible(true)}>
                                            Registrar propietario nuevo
                                        </button>
                                    </div>
                                    <button type="submit" className={styles.signInButton}>
                                        Registrar Vehículo
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            {modalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Registrar Propietario Nuevo</h2>
                        <form onSubmit={handlePropietarioSubmit}>
                            <label htmlFor="numero_identificacion" className={styles.organizationLabel}>
                                Número de Identificación
                            </label>
                            <input
                                type="text"
                                id="numero_identificacion"
                                name="numero_identificacion"
                                value={propietarioData.numero_identificacion}
                                onChange={(e) => setPropietarioData({ ...propietarioData, numero_identificacion: e.target.value })}
                                className={styles.inputField}
                                aria-label="Número de Identificación."
                                required
                            />
                            <label htmlFor="nombre" className={styles.organizationLabel}>
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={propietarioData.nombre}
                                onChange={(e) => setPropietarioData({ ...propietarioData, nombre: e.target.value })}
                                className={styles.inputField}
                                aria-label="Nombre."
                                required
                            />
                            <button type="submit" className={styles.signInButton}>
                                Registrar Propietario
                            </button>
                        </form>
                        <button onClick={() => setModalVisible(false)} className={styles.closeButton}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}