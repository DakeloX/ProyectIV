import React from 'react';
import { format, differenceInDays } from 'date-fns';
import styles from "../app/styles/donationCard.module.css";

const DonationCard = ({ donacion }) => {
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

    return (
        <div className={`${styles.card} ${cardStyle}`}>
            <h3>{donacion.nombre_producto}</h3>
            <p><strong>Cantidad:</strong> {donacion.cantidad}</p>
            <p className={styles.description}><strong>Descripción:</strong> {donacion.descripcion}</p>
            <p><strong>Peso Total:</strong> {donacion.peso_total} kg</p>
            <p><strong>Fecha de caducidad:</strong> {formatDate(donacion.fecha_caducidad)}</p>
            <p><strong>Estado:</strong> {donacion.estado}</p>
        </div>
    );
};

export default DonationCard;