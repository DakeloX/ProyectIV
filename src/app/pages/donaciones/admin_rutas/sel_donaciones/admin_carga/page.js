"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/app/styles/adminV.module.css';

export default function AdminC() {
    const [cargamentos, setCargamentos] = useState([]);

    const fetchCargamentos = async () => {
        try {
            const response = await axios.get('/api/rutas/consult_cargaAdmin');
            setCargamentos(response.data);
        } catch (error) {
            console.error('Error al obtener los cargamentos:', error);
            toast.error('Error al obtener los cargamentos. Por favor, intenta de nuevo.');
        }
    };

    useEffect(() => {
        fetchCargamentos();
    }, []);

    const handleDelete = async (id_cargamento) => {
        try {
            const response = await axios.post('/api/rutas/consult_cargaAdmin/delete_carga', { idCargamento: id_cargamento });
            if (response.status === 200) {
                setCargamentos(cargamentos.filter(cargamento => cargamento.id_cargamento !== id_cargamento));
                toast.success('Cargamento eliminado con éxito.');
            } else {
                toast.error('Error al eliminar cargamento. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error al eliminar cargamento:', error);
            toast.error('Error al eliminar cargamento. Por favor, intenta de nuevo.');
        }
    };

    const handleEmpty = async (id_cargamento) => {
        try {
            const response = await axios.post('/api/rutas/consult_cargaAdmin/vaciar_carga', { idCargamento: id_cargamento });
            if (response.status === 200) {
                // Fetch updated cargamentos to refresh the table
                await fetchCargamentos();
                toast.success('Cargamento vaciado con éxito.');
            } else {
                toast.error('Error al vaciar cargamento. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error al vaciar cargamento:', error);
            toast.error('Error al vaciar cargamento. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <h1 className={styles.heading}>Administrar Cargamentos</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cargamento</th>
                        <th>Peso (kg)</th>
                        <th>Estado</th>
                        <th>Donaciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cargamentos.map(cargamento => (
                        <tr key={cargamento.id_cargamento}>
                            <td>{cargamento.id_cargamento}</td>
                            <td>{cargamento.peso}</td>
                            <td>{cargamento.estado}</td>
                            <td>{cargamento.donaciones}</td>
                            <td className={styles.actionButton}>
                                <button className={styles.button} onClick={() => handleDelete(cargamento.id_cargamento)}>Eliminar</button>
                                <button className={styles.button} onClick={() => handleEmpty(cargamento.id_cargamento)}>Vaciar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
