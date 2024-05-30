"use client";

import { useState, useEffect } from 'react';
import styles from "@/app/styles/selectDonation.module.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function SelectDonations() {
    const { data: session } = useSession();
    const idFundacion = session?.user?.idUser || '';

    const [carga, setCarga] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [donaciones, setDonaciones] = useState([]);
    const [selectedRuta, setSelectedRuta] = useState('');
    const [selectedCarga, setSelectedCarga] = useState('');
    const [tempSelectedDonations, setTempSelectedDonations] = useState([]);
    const [maxLoad, setMaxLoad] = useState(0);
    const [currentLoad, setCurrentLoad] = useState(0);


        const fetchCargamentos = async () => {
            try {
                const response = await axios.get('/api/rutas/consult_carga', {
                    params: { idFundacion }
                });
                setCarga(response.data);
            } catch (error) {
                console.error('Error al obtener los cargamentos', error);
                toast.error('Error al obtener los cargamentos. Por favor, intenta de nuevo.', { autoClose: false });
            }
        };

    useEffect(() => {
        if (idFundacion) {
        fetchCargamentos();
        }
    }, [idFundacion]);

    const handleNewCarga = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/rutas/newCarga', { fundacion: idFundacion });
            toast.success('¡Creacion exitosa de nuevo cargamento!');

            await fetchCargamentos();
        } catch (error) {
            toast.error('Error al Crear nuevo cargamento, intente de nuevo porfavor');
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                if (idFundacion) {
                    const response = await axios.post('/api/getDonacionesF/donacionesEnv', { idFundacion });
                    const data = response.data;
                    setDonaciones(data);
                }
            } catch (error) {
                console.error('Error al obtener las donaciones:', error);
            }
        }

        fetchData();
    }, [idFundacion]);

    useEffect(() => {
        const fetchRutas = async () => {
            try {
                const response = await axios.get('/api/rutas/consult_ruta', {
                    params: { idFundacion }
                });
                setRutas(response.data);
            } catch (error) {
                console.error('Error al obtener las rutas:', error);
                toast.error('Error al obtener las rutas. Por favor, intenta de nuevo.', { autoClose: false });
            }
        };
        if (idFundacion) {
        fetchRutas();
        }
    }, [idFundacion]);

    const handleRutaChange = (event) => {
        setSelectedRuta(event.target.value);
    };

    const handleCargaChange = (event) => {
        setSelectedCarga(event.target.value);
    };

    useEffect(() => {
        if (selectedRuta) {
            const fetchCapacidad = async () => {
                try {
                    const response = await axios.post('/api/rutas/consult_ruta/consult_capacidad', { id_ruta: selectedRuta });
                    setMaxLoad(response.data.capacidad);
                } catch (error) {
                    console.error('Error al obtener la capacidad del vehículo:', error);
                    toast.error('Error al obtener la capacidad del vehículo. Por favor, intenta de nuevo.', { autoClose: false });
                }
            };

            fetchCapacidad();
        }
    }, [selectedRuta]);

    const handleAddDonation = async (donacion) => {
        const newLoad = currentLoad + donacion.peso_total;
        if (maxLoad >= newLoad) {
            setTempSelectedDonations([...tempSelectedDonations, donacion]);
            setCurrentLoad(newLoad);
            toast.success('Donación agregada con éxito.');
        } else {
            toast.error('La carga total supera la capacidad máxima del vehículo.');
        }
    };

    const handleRemoveDonation = (donacion) => {
        const newSelectedDonations = tempSelectedDonations.filter(d => d.id_donacion !== donacion.id_donacion);
        setTempSelectedDonations(newSelectedDonations);
        setCurrentLoad((currentLoad - donacion.peso_total));
        toast.warning('Donación eliminada temporalmente.');
    };

    const handleConfirm = async () => {
        try {
            await Promise.all(tempSelectedDonations.map(async (donacion) => {
                await axios.post('/api/getDonacionesF/donacionesEnv/insertEnv', {
                    cargamento: selectedCarga,
                    donacion: donacion.id_donacion,
                    peso: currentLoad,
                    ruta: selectedRuta,
                    fundacion: idFundacion
                });
            }));
            await axios.post('/api/getDonacionesF/donacionesEnv/insertRutaCarga', {
                cargamento: selectedCarga,
                peso: currentLoad,
                ruta: selectedRuta,
                fundacion: idFundacion
            });
            toast.success('Donaciones ingresadas al cargamento con éxito.');
            setTempSelectedDonations([]);
            setCurrentLoad(0);

            // Eliminar las donaciones seleccionadas de la lista de donaciones
            const updatedDonaciones = donaciones.filter(donacion => !tempSelectedDonations.some(d => d.id_donacion === donacion.id_donacion));
            setDonaciones(updatedDonaciones);
        } catch (error) {
            console.error('Error al registrar las donaciones:', error);
            toast.error('Error al registrar las donaciones. Por favor, intenta de nuevo.');
        }
    };


    const isDonationExpired = (fechaCaducidad) => {
        const today = new Date();
        const expiryDate = new Date(fechaCaducidad);
        return expiryDate < today;
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <ToastContainer />
                <h1>Seleccionar Donaciones</h1>
                <p className={styles.cargaText}>Carga Actual: {currentLoad} kg / {maxLoad} kg</p>

                <select
                    id="id_ruta"
                    name="id_ruta"
                    value={selectedRuta}
                    onChange={handleRutaChange}
                    className={styles.selectR}
                    aria-label="Ruta."
                    required
                >
                    <option value="">Seleccione una ruta</option>
                    {rutas.map((ruta) => (
                        <option key={ruta.id_ruta} value={ruta.id_ruta}>
                            {ruta.ciudad_destino} - {ruta.direccion}
                        </option>
                    ))}
                </select>

                <div className={styles.columns}>
                    <div className={styles.leftColumn}>
                        <h3>Selecciona un cargamento para ingresar donaciones:</h3>
                        <select
                            id="id_cargamento"
                            name="id_cargamento"
                            value={selectedCarga}
                            onChange={handleCargaChange}
                            className={styles.select}
                            required
                            disabled={tempSelectedDonations.length > 0}
                        >
                            <option value="">Seleccione el cargamento que desea asignar</option>
                            {carga.map((carga) => (
                                <option key={carga.id_cargamento} value={carga.id_cargamento}>
                                    Cargamento: {carga.id_cargamento}
                                </option>
                            ))}
                        </select>
                        <div className={styles.adminLink}>
                            <a href='/pages/donaciones/admin_rutas/sel_donaciones/admin_carga'>Administrar cargamentos</a>
                        </div>
                        <button onClick={handleNewCarga}>Crear nuevo cargamento</button>
                        <button onClick={handleConfirm} className={styles.confirmButton} disabled={tempSelectedDonations.length === 0}>
                            Confirmar Ruta
                        </button>
                    </div>

                    <div className={styles.rightColumn}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Peso Total</th>
                                    <th>Fecha Caducidad</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donaciones.filter(donacion => !isDonationExpired(donacion.fecha_caducidad)).map(donacion => (
                                    <tr key={donacion.id_donacion}>
                                        <td>{donacion.nombre_producto}</td>
                                        <td>{donacion.peso_total} kg</td>
                                        <td>{new Date(donacion.fecha_caducidad).toLocaleDateString()}</td>
                                        <td>
                                            {tempSelectedDonations.some(d => d.id_donacion === donacion.id_donacion) ? (
                                                <button onClick={() => handleRemoveDonation(donacion)}>Quitar</button>
                                            ) : (
                                                <button onClick={() => handleAddDonation(donacion)}>Agregar</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
