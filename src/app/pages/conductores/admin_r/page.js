"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/app/styles/adminC.module.css';

export default function AdminCargamentosConductor() {
    const { data: session } = useSession();
    const idConductor = session?.user?.idUser;

    const [cargamentos, setCargamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCargamentos() {
            try {
                const response = await axios.post('/api/cargamentos/getCargamentosConductor', { idConductor });
                const data = response.data;
                setCargamentos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los cargamentos:', error);
                setLoading(false);
            }
        }

        if (idConductor) {
            fetchCargamentos();
        }
    }, [idConductor]);

    const handleChangeState = async (idCargamento, newState) => {
        try {
            const endpoint = newState === 3 
                ? '/api/cargamentos/changeStateToEnCamino' 
                : '/api/cargamentos/changeStateToEntregado';

            const response = await axios.post(endpoint, { idCargamento });
            if (response.status === 200) {
                toast.success(response.data.message);
                setCargamentos(cargamentos.map(c => c.id_cargamento === idCargamento ? { ...c, estado: newState } : c));
            } else {
                toast.error('Error al actualizar el estado del cargamento. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error al actualizar el estado del cargamento:', error);
            toast.error('Error al actualizar el estado del cargamento. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <h1 className={styles.heading}>Administrar Cargamentos</h1>
            <div>
                {loading ? (
                    <p>Cargando cargamentos...</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Ruta</th> {/* Nueva columna de Ruta */}
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
                                    <td>{cargamento.ruta}</td> {/* Nueva celda de Ruta */}
                                    <td>{cargamento.id_cargamento}</td>
                                    <td>{cargamento.peso}</td>
                                    <td>{cargamento.estado}</td>
                                    <td>{cargamento.donaciones}</td>
                                    <td className={styles.actionButton}>
                                        {cargamento.estado === 'cargado' || cargamento.estado === 2 ? (
                                            <button 
                                                className={styles.button} 
                                                onClick={() => handleChangeState(cargamento.id_cargamento, 3)}
                                            >
                                                En Camino
                                            </button>
                                        ) : null}
                                        {cargamento.estado === 'En Camino' || cargamento.estado === 3 ? (
                                            <button 
                                                className={styles.button} 
                                                onClick={() => handleChangeState(cargamento.id_cargamento, 4)}
                                            >
                                                Entregado
                                            </button>
                                        ) : null}
                                        {cargamento.estado === 'Entregado' || cargamento.estado === 4 ? (
                                            <button 
                                                className={styles.buttonDisabled} 
                                                disabled
                                            >
                                                Ruta Finalizada
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}