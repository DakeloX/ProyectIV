"use client";

import { useState, useEffect } from 'react';
import DonationCard from "@/components/DonationCard_F";
import styles from "@/app/styles/selectDonation.module.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function SelectDonations() {
    const { data: session } = useSession();
    const idFundacion = session?.user?.idUser || ''; // Asegúrate de obtener el ID de la fundación correctamente

    const [donaciones, setDonaciones] = useState([]);
    const [selectedDonations, setSelectedDonations] = useState([]);
    const [maxLoad, setMaxLoad] = useState(0);
    const [currentLoad, setCurrentLoad] = useState(0);

    // Simular valores para evitar errores al acceder a router.query
    const { id_vehiculo = '9', id_conductor = '', fecha_salida = '', ciudad_destino = '', direccion = '' } = {};

    useEffect(() => {
        async function fetchData() {
            try {
                if (idFundacion) {
                    const response = await axios.post('/api/getDonacionesF/donacionesEnv', { idFundacion });
                    console.log('Data from API:', response.data); // Verificar los datos recibidos
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
        async function fetchMaxLoad() {
            try {
                const response = await axios.get(`/api/rutas/vehiculos`,{id_vehiculo});
                const vehiculo = response.data;
                setMaxLoad(vehiculo.carga_maxima);
            } catch (error) {
                console.error('Error al obtener la carga máxima del vehículo:', error);
            }
        }

        if (id_vehiculo) {
            fetchMaxLoad();
        }
    }, [id_vehiculo]);

    const handleAddDonation = (donacion) => {
        const newLoad = currentLoad + donacion.peso_total;
        if (newLoad <= maxLoad) {
            setSelectedDonations([...selectedDonations, donacion]);
            setCurrentLoad(newLoad);
        } else {
            toast.error('La carga total supera la capacidad máxima del vehículo.', { autoClose: false });
        }
    };

    const handleRemoveDonation = (donacion) => {
        const newSelectedDonations = selectedDonations.filter(d => d.id_donacion !== donacion.id_donacion);
        setSelectedDonations(newSelectedDonations);
        setCurrentLoad(currentLoad - donacion.peso_total);
    };

    const handleConfirm = async () => {
        try {
            const rutaResponse = await axios.post('/api/ruta/nueva_ruta', {
                id_vehiculo,
                id_conductor,
                fecha_salida,
                ciudad_destino,
                direccion,
                idFundacion
            });
            const rutaId = rutaResponse.data.id_ruta;

            await axios.post('/api/ruta/carga_ruta', {
                id_ruta: rutaId,
                donaciones: selectedDonations.map(d => d.id_donacion)
            });

            toast.success('¡Ruta registrada exitosamente!', { autoClose: false });
            // No necesitas redireccionar, ya que no estás utilizando useRouter()
        } catch (error) {
            console.error('Error al registrar la ruta:', error);
            toast.error('Error al registrar la ruta. Por favor, intenta de nuevo.', { autoClose: false });
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
                <p>Carga Actual: {currentLoad} kg / {maxLoad} kg</p>
                <div className={styles.cardContainer}>
                    {donaciones.filter(donacion => !isDonationExpired(donacion.fecha_caducidad)).map(donacion => (
                        <DonationCard
                            key={donacion.id_donacion}
                            donacion={donacion}
                            onAdd={() => handleAddDonation(donacion)}
                            onRemove={() => handleRemoveDonation(donacion)}
                            isSelected={selectedDonations.some(d => d.id_donacion === donacion.id_donacion)}
                        />
                    ))}
                </div>
                <button onClick={handleConfirm} className={styles.confirmButton} disabled={currentLoad === 0}>
                    Confirmar Ruta
                </button>
            </main>
        </div>
    );
}
