import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import styles from "../app/styles/donationCard.module.css";

const DonationCard = ({ donacion }) => {
    const [estado, setEstado] = useState(donacion.estado);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    const getDaysUntilExpiry = (dateString) => {
        const today = new Date();
        const expiryDate = new Date(dateString);
        return differenceInDays(expiryDate, today);
    };

    const daysUntilExpiry = getDaysUntilExpiry(donacion.fecha_caducidad);

    let cardStyle;
    if (daysUntilExpiry <= 5) {
        cardStyle = styles.redCard;
    } else if (daysUntilExpiry <= 15) {
        cardStyle = styles.orangeCard;
    } else {
        cardStyle = styles.greenCard;
    }

    const handleEstadoChange = async (event) => {
        const newEstado = event.target.value;
        try {
            const response = await fetch('/api/update_Estado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_donacion: donacion.id_donacion, estado: newEstado }),
            });
            if (response.ok) {
                setEstado(newEstado);
            } else {
                console.error('Error al actualizar el estado de la donación');
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la donación:', error);
        }
    };

    return (
        <div className={`${styles.card} ${cardStyle}`}>
            <h3>{donacion.nombre_producto}</h3>
            <p><strong>Cantidad:</strong> {donacion.cantidad}</p>
            <p className={styles.description}><strong>Descripción:</strong> {donacion.descripcion}</p>
            <p><strong>Fecha de caducidad:</strong> {formatDate(donacion.fecha_caducidad)}</p>
            <p><strong>Estado:</strong></p>
            <select value={estado} onChange={handleEstadoChange} className={styles.estadoSelect}>
                <option value="En bodega">En bodega</option>
                <option value="En transito">En tránsito</option>
                <option value="Entregado">Entregado</option>
            </select>
        </div>
    );
};

export default DonationCard;