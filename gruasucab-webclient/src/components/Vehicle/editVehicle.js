import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleById, updateVehicle } from '../../api/apiVehicle';
import { setAuthToken } from '../../api/apiAuth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
        const vehicleData = await getVehicleById(id);
        setVehicle(vehicleData.vehicle);
      } catch (error) {
        console.error('Error al cargar los datos del vehículo:', error);
        alert('Error al cargar datos del vehículo');
      }
    };

    if (id) {
      fetchVehicleData();
    }
  }, [id]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
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
      if (token) {
        setAuthToken(token);
      } else {
        throw new Error('No se encontró el token de autenticación');
      }
      const updatedVehicle = {
        userEmail: localStorage.getItem('userEmail'),
        userId: localStorage.getItem('userID'),
        vehicleId: vehicle.vehicleId,
        driverId: vehicle.driverId,
        supplierId: vehicle.supplierId,
        civilLiability: vehicle.civilLiability,
        civilLiabilityExpirationDate: vehicle.civilLiabilityExpirationDate,
        trafficLicense: vehicle.trafficLicense,
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        color: vehicle.color,
        model: vehicle.model,
        vehicleTypeId: vehicle.vehicleTypeId
      };
      await updateVehicle(updatedVehicle);
      alert('Vehículo actualizado con éxito');
      navigate(`/vehicle/${id}`);
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
      setError('Error al actualizar el vehículo. Verifique sus permisos.');
      alert('Error al actualizar el vehículo. Verifique sus permisos.');
    }
  };

  return (
    <Container>
      <h2>Editar Vehículo</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formBrand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={vehicle.brand}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formModel">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={vehicle.model}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={vehicle.color}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLicensePlate">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                name="licensePlate"
                value={vehicle.licensePlate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Actualizar Vehículo
        </Button>
      </Form>
    </Container>
  );
};

export default EditVehicle;