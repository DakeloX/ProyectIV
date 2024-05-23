"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "@/app/styles/registerV.module.css";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterRuta() {
    const { data: session } = useSession();
    const idFundacion = session?.user?.idUser;

    const [formData, setFormData] = useState({
        id_vehiculo: '',
        id_conductor: '',
        fecha_salida: '',
        ciudad_destino: ''
    });

    const [vehiculos, setVehiculos] = useState([]);
    const [conductores, setConductores] = useState([]);

    useEffect(() => {
        const fetchVehiculos = async () => {
            try {
                const response = await axios.get('/api/rutas/vehiculos');
                setVehiculos(response.data);
            } catch (error) {
                console.error('Error al obtener los vehículos:', error);
                toast.error('Error al obtener los vehículos. Por favor, intenta de nuevo.', { autoClose: false });
            }
        };

        const fetchConductores = async () => {
            try {
                const response = await axios.get('/api/rutas/conductores');
                setConductores(response.data);
                console.log('Conductores:', response.data); // Agregar log
            } catch (error) {
                console.error('Error al obtener los conductores:', error);
                toast.error('Error al obtener los conductores. Por favor, intenta de nuevo.', { autoClose: false });
            }
        };

        fetchVehiculos();
        fetchConductores();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/nueva_ruta', { ...formData, idFundacion });
            console.log('Ruta registrada exitosamente:', response.data);
            toast.success('¡Registro de ruta exitoso!', { autoClose: false });
            setFormData({
                id_vehiculo: '',
                id_conductor: '',
                fecha_salida: '',
                ciudad_destino: ''
            });
        } catch (error) {
            console.error('Error al registrar ruta:', error);
            toast.error('Error al registrar ruta. Por favor, intenta de nuevo.', { autoClose: false });
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.columns}>
                    <div className={styles.imageColumn}>
                        <Link href="#" className={styles.link}>
                            <div className={styles.card}>
                                <div className={styles.imageItem}>
                                    <Image src="/img/vehiculos.png" alt="Administrar Rutas" width={250} height={250} className={styles.image} />
                                    <p className={styles.imageText}>Administrar Rutas</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.contentColumn}>
                        <div className={styles.contentWrapper}>
                            <section className={styles.registrationContainer}>
                                <h1 className={styles.registrationTitle}>Registro de Nueva Ruta</h1>
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <label htmlFor="id_vehiculo" className={styles.label}>
                                        Vehículo
                                    </label>
                                    <select
                                        id="id_vehiculo"
                                        name="id_vehiculo"
                                        value={formData.id_vehiculo}
                                        onChange={(e) => setFormData({ ...formData, id_vehiculo: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Vehículo."
                                        required
                                    >
                                        <option value="">Seleccione un vehículo</option>
                                        {vehiculos.map((vehiculo) => (
                                            <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                                                {vehiculo.numero_placa}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="id_conductor" className={styles.label}>
                                        Conductor
                                    </label>
                                    <select
                                        id="id_conductor"
                                        name="id_conductor"
                                        value={formData.id_conductor}
                                        onChange={(e) => setFormData({ ...formData, id_conductor: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Conductor."
                                        required
                                    >
                                        <option value="">Seleccione un conductor</option>
                                        {conductores.map((conductor) => (
                                            <option key={conductor.identificacion} value={conductor.identificacion}>
                                                {conductor.nombre} - {conductor.identificacion}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="fecha_salida" className={styles.label}>
                                        Fecha de Salida
                                    </label>
                                    <input
                                        type="date"
                                        id="fecha_salida"
                                        name="fecha_salida"
                                        value={formData.fecha_salida}
                                        onChange={(e) => setFormData({ ...formData, fecha_salida: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Fecha de Salida."
                                        required
                                    />
                                    <label htmlFor="ciudad_destino" className={styles.label}>
                                        Ciudad de Destino
                                    </label>
                                    <input
                                        type="text"
                                        id="ciudad_destino"
                                        name="ciudad_destino"
                                        value={formData.ciudad_destino}
                                        onChange={(e) => setFormData({ ...formData, ciudad_destino: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Ciudad de Destino."
                                        required
                                    />
                                    <button type="submit" className={styles.signInButton}>
                                        Registrar Ruta
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
