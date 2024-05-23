"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import styles from "@/app/styles/register.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

export default function F_Donacion() {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        userId: '',
        productName: '',
        description: '',
        quantity: '',
        weight: '', // Nuevo campo para el peso individual
        expiryDate: '',
        additionalComments: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const pesoTotal = formData.quantity * formData.weight;
        const idFundacion = session?.user?.idUser;
        try {
            const response = await axios.post('/api/f_donacion', {
                ...formData,
                pesoTotal,
                idFundacion
            });

            console.log('Donación registrada:', response.data);
            toast.success('¡Donación registrada exitosamente!', { autoClose: false });
            setFormData({
                userId: '',
                productName: '',
                description: '',
                quantity: '',
                weight: '', // Reseteo del campo de peso
                expiryDate: '',
                additionalComments: ''
            });
        } catch (error) {
            console.error('Error al registrar la donación:', error);
            toast.error('Error al registrar la donación. Por favor, intenta de nuevo.', { autoClose: false });
        }
        
    };

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (next) => setCurrentSlide(next)
    };

    const goToNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.columns}>
                    <div className={styles.imageColumn}>
                        <div className={styles.sliderContent} onClick={goToNextSlide}>
                            <Slider ref={sliderRef} {...settings}>
                                <div>
                                    <Image src="/img/donacion2.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                                <div>
                                    <Image src="/img/donacion3.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                                <div>
                                    <Image src="/img/donacion1.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className={styles.contentColumn}>
                        <div className={styles.contentWrapper}>
                            <section className={styles.registrationContainer}>
                                <h1 className={styles.registrationTitle}>Registro Donaciones</h1>
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <label htmlFor="userId" className={styles.organizationLabel}>
                                        Identificación usuario donante
                                    </label>
                                    <input
                                        type="text"
                                        id="userId"
                                        name="userId"
                                        value={formData.userId}
                                        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Identificación del usuario que realiza la donación"
                                        required
                                    />

                                    <label htmlFor="productName" className={styles.organizationLabel}>
                                        Nombre del producto
                                    </label>
                                    <input
                                        type="text"
                                        id="productName"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Nombre del producto donado"
                                        required
                                    />

                                    <label htmlFor="description" className={styles.organizationLabel}>
                                        Descripción
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className={styles.inputField}
                                        required
                                    ></textarea>

                                    <label htmlFor="quantity" className={styles.organizationLabel}>
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Cantidad"
                                        required
                                    />

                                    <label htmlFor="weight" className={styles.organizationLabel}>
                                        Peso por unidad (kg)
                                    </label>
                                    <input
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Peso por unidad"
                                        required
                                    />

                                    <label htmlFor="expiryDate" className={styles.organizationLabel}>
                                        Fecha de caducidad
                                    </label>
                                    <input
                                        type="date"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Fecha de caducidad"
                                        required
                                    />

                                    <label htmlFor="additionalComments" className={styles.organizationLabel}>
                                        Comentarios adicionales
                                    </label>
                                    <textarea
                                        id="additionalComments"
                                        name="additionalComments"
                                        value={formData.additionalComments}
                                        onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                                        className={styles.inputField}
                                    ></textarea>

                                    <button type="submit" className={styles.signInButton}>
                                        Registrar Donacion
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