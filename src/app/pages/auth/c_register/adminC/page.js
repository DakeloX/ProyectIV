"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/app/styles/adminV.module.css';

export default function AdminC() {
    const [conductor, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('/api/c_registro/adminC');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error al obtener los vehículos:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleDelete = async (identificacion) => {
        try {
            await axios.delete('/api/c_registro/adminC', { data: { identificacion } });
            setVehicles(conductor.filter(conductor => conductor.identificacion !== identificacion));
        } catch (error) {
            console.error('Error al eliminar vehículo:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Administrar Conductores</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Identificación</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {conductor.map(conductor => (
                        <tr key={conductor.identificacion}>
                            <td>{conductor.identificacion}</td>
                            <td>{conductor.nombre}</td>
                            <td>{conductor.correo}</td>
                            <td className={styles.actionButton}>
                                <button className={styles.button} onClick={() => handleDelete(conductor.identificacion)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
