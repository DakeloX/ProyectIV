"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/app/styles/adminV.module.css';
import { useSession } from 'next-auth/react';

export default function AdminC() {

    const [rutas, setRutas] = useState([]);

    const {data:session} = useSession();
    const idConductor = session?.user?.idUser;

    const fetchRuta = async () => {

        const api_ruta = '/api/rutas/consult_ruta/consult_rutaC';
        try {
            const response = await axios.post(api_ruta, {idConductor: idConductor});
            setRutas(response.data);
        } catch (error) {
            console.error('Error al obtener los cargamentos:', error);
            toast.error('Error al obtener los cargamentos. Por favor, intenta de nuevo.');
        }
    };

    useEffect(() => {
        fetchRuta();
    }, []);



    return (
        <div className={styles.container}>
            <ToastContainer />
            <h1 className={styles.heading}>Consulta de rutas asignadas</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Vehículo</th>
                        <th>Fecha de salida</th>
                        <th>Ciudad destino</th>
                        <th>Dirección</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {rutas.map(ruta => (
                        <tr key={ruta.id_ruta}>
                            <td>{ruta.id_vehiculo}</td>
                            <td>{ruta.fecha_salida}</td>
                            <td>{ruta.ciudad_destino}</td>
                            <td>{ruta.direccion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
