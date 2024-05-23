"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/app/styles/adminV.module.css';

export default function AdminV() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('/api/v_registro/adminV');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error al obtener los vehículos:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleDelete = async (id_vehiculo) => {
        try {
            await axios.delete('/api/v_registro/adminV', { data: { id_vehiculo } });
            setVehicles(vehicles.filter(vehicle => vehicle.id_vehiculo !== id_vehiculo));
        } catch (error) {
            console.error('Error al eliminar vehículo:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Administrar Vehículos</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Número de Placa</th>
                        <th>Tipo de Vehículo</th>
                        <th>Capacidad (kg)</th>
                        <th>Propietario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicle => (
                        <tr key={vehicle.id_vehiculo}>
                            <td>{vehicle.numero_placa}</td>
                            <td>{vehicle.tipo_vehiculo}</td>
                            <td>{vehicle.capacidad}</td>
                            <td>{vehicle.propietario}</td>
                            <td className={styles.actionButton}>
                                <button className={styles.button} onClick={() => handleDelete(vehicle.id_vehiculo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
