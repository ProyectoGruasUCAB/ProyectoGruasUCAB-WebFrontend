import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setAuthToken } from '../../api/apiAuth';
import { createVehicle } from '../../api/apiVehicle';

const AddVehicle = () => {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        userEmail: '',
        userId: '',
        driverId: '',
        supplierId: '',
        civilLiability: '',
        civilLiabilityExpirationDate: '',
        trafficLicense: '',
        licensePlate: '',
        brand: '',
        color: '',
        model: '',
        vehicleTypeId: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        setVehicle({
            userEmail: localStorage.getItem('userEmail'),
            userId: localStorage.getItem('userID'),
            driverId: '',
            supplierId: '',
            civilLiability: '',
            civilLiabilityExpirationDate: '',
            trafficLicense: '',
            licensePlate: '',
            brand: '',
            color: '',
            model: '',
            vehicleTypeId: '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({
            ...vehicle,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);
            await createVehicle(vehicle);
            setVehicle({
                userEmail: localStorage.getItem('userEmail'),
                userId: localStorage.getItem('userID'),
                driverId: null,
                supplierId: '',
                civilLiability: '',
                civilLiabilityExpirationDate: '',
                trafficLicense: '',
                licensePlate: '',
                brand: '',
                color: '',
                model: '',
                vehicleTypeId: '',
            });
            setError(''); // Limpiar cualquier mensaje de error anterior
            navigate("/vehicles");
        } catch (error) {
            console.error('Error al agregar el vehículo:', error);
            setError('Error al agregar el vehículo, intenta de nuevo');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Agregar Vehículo</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label htmlFor="brand" className="form-label">Marca:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Marca del vehículo"
                                id="brand"
                                name="brand"
                                value={vehicle.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="color" className="form-label">Color:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Color del vehículo"
                                id="color"
                                name="color"
                                value={vehicle.color}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="model" className="form-label">Modelo:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Modelo del vehículo"
                                id="model"
                                name="model"
                                value={vehicle.model}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="civilLiability" className="form-label">Responsabilidad Civil:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Responsabilidad Civil"
                                id="civilLiability"
                                name="civilLiability"
                                value={vehicle.civilLiability}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="civilLiabilityExpirationDate" className="form-label">Fecha de Expiración de la Responsabilidad Civil:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="civilLiabilityExpirationDate"
                                name="civilLiabilityExpirationDate"
                                value={vehicle.civilLiabilityExpirationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="trafficLicense" className="form-label">Licencia de Tránsito:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Licencia de Tránsito"
                                id="trafficLicense"
                                name="trafficLicense"
                                value={vehicle.trafficLicense}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="licensePlate" className="form-label">Placa:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Placa del vehículo"
                                id="licensePlate"
                                name="licensePlate"
                                value={vehicle.licensePlate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="vehicleTypeId" className="form-label">ID del Tipo de Vehículo:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ID del Tipo de Vehículo"
                                id="vehicleTypeId"
                                name="vehicleTypeId"
                                value={vehicle.vehicleTypeId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary w-50">Agregar Vehículo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVehicle;
