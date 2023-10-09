
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Feedback from 'react-bootstrap/Feedback';
import axios from 'axios';
import { vehicleStateModel } from './Tradesheet';

const AddTradeModal = ({ show, onHide }) => {
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [tradeData, setTradeData] = useState(vehicleStateModel);

    const handleTradeSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await axios.post('http://localhost:8000/api/vehicle', tradeData);
            console.log(response);
            console.log(tradeData);

            if (response.status === 200) {
                // Trade was successfully saved, you can handle it here
                setTradeData(response.data);
                setValidated(true);
                onHide();
            }
        } catch (error) {
            // Handle validation errors from the response
            if (error.response && error.response.data.errors) {
                // Server-side validation errors
                setErrors(error.response.data.errors);
                setValidated(false);
                console.log(tradeData);
                console.log(error.response.data.errors);
            } else {
                console.error(error);
                console.log(tradeData);
                console.log(error.response.data.errors);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTradeData((prevTradeData) => ({
            ...prevTradeData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        const [parent, child] = name.split('.');

        // Update the state for the specific checkbox
        setTradeData((prevTradeData) => ({
            ...prevTradeData,
            [parent]: {
                ...prevTradeData[parent],
                [child]: checked,
            },
        }));

        // Validate the checkboxes
        const isAnyCheckboxChecked = Object.values(tradeData[parent]).some((value) => value);
        if (!isAnyCheckboxChecked) {
            // At least one checkbox should be checked
            setErrors((prevErrors) => ({
                ...prevErrors,
                [parent]: 'Please select at least one option.',
            }));
        } else {
            // Clear the error when at least one checkbox is checked
            setErrors((prevErrors) => ({
                ...prevErrors,
                [parent]: undefined,
            }));
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Trade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleTradeSubmit}>
                    <Form.Group controlId='carfax'>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    label="Carfax"
                                    id="report"
                                    name="carfax.report"
                                    checked={tradeData.carfax.report}
                                    onChange={handleCheckboxChange}
                                    required
                                    isInvalid={!tradeData.carfax.report && !tradeData.carfax.damage && !tradeData.carfax.branded}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    label="Damage Reported"
                                    id="damage"
                                    name="carfax.damage"
                                    checked={tradeData.carfax.damage}
                                    onChange={handleCheckboxChange}
                                    required
                                    isInvalid={!tradeData.carfax.report && !tradeData.carfax.damage && !tradeData.carfax.branded}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    label="Branded Title"
                                    id="branded"
                                    name="carfax.branded"
                                    checked={tradeData.carfax.branded}
                                    onChange={handleCheckboxChange}
                                    required
                                    isInvalid={!tradeData.carfax.report && !tradeData.carfax.damage && !tradeData.carfax.branded}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="stocknumber">
                                <Form.Label>Stock Number:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="stocknumber"
                                    value={tradeData.stocknumber}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.stocknumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.stocknumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="vin">
                                <Form.Label>VIN:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="vin"
                                    value={tradeData.vin}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.vin}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.vin?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="year">
                                <Form.Label>Year:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="year"
                                    value={tradeData.year}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.year}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.year?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="make">
                                <Form.Label>Make:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="make"
                                    value={tradeData.make}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.make}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.make?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="model">
                                <Form.Label>Model:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="model"
                                    value={tradeData.model}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.model}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.model?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="color">
                                <Form.Label>Color:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="color"
                                    value={tradeData.color}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.color}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.color?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </ Row>
                    <Row>
                        <Col>
                            <Form.Group
                                controlId="mechanical"
                                isInvalid={!!errors.mechanical}
                            // feedback="Please select condition."
                            >
                                <Form.Label>Mechanical:</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.mechanical?.message}
                                </Form.Control.Feedback>
                                <Form.Check
                                    type="radio"
                                    label="Good"
                                    id="mechanical-good"
                                    name="mechanical"
                                    value="Good"
                                    checked={tradeData.mechanical === 'Good'}
                                    onChange={handleInputChange}
                                    required
                                    isInvalid={!!errors.mechanical}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Fair"
                                    id="mechanical-fair"
                                    name="mechanical"
                                    value="Fair"
                                    checked={tradeData.mechanical === 'Fair'}
                                    onChange={handleInputChange}
                                    required
                                    isInvalid={!!errors.mechanical}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Poor"
                                    id="mechanical-poor"
                                    name="mechanical"
                                    value="Poor"
                                    checked={tradeData.mechanical === 'Poor'}
                                    onChange={handleInputChange}
                                    required
                                    isInvalid={!!errors.mechanical}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="appearance" isInvalid={!!tradeData.appearance}>
                                <Form.Label>Appearance:</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Good"
                                    id="appearance-good"
                                    name="appearance"
                                    value="Good"
                                    checked={tradeData.appearance === 'Good'}
                                    onChange={handleInputChange}
                                    required
                                    isInvalid={!!errors.appearance}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Fair"
                                    id="appearance-fair"
                                    name="appearance"
                                    value="Fair"
                                    checked={tradeData.appearance === 'Fair'}
                                    onChange={handleInputChange}
                                    required
                                    isInvalid={!!errors.appearance}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Poor"
                                    id="appearance-poor"
                                    name="appearance"
                                    value="Poor"
                                    checked={tradeData.appearance === 'Poor'}
                                    onChange={handleInputChange}
                                    required
                                    isInvalid={!!errors.appearance}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.appearance?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Value:</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Label>Booked In:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Group controlId="bookedat" isInvalid={!!errors.bookedat}>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="bookedat"
                                            value={tradeData.bookedat}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.bookedat}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.bookedat?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Black Book::</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Group controlId="blackbook" >
                                        <Form.Control
                                            required
                                            type="text"
                                            name="blackbook"
                                            value={tradeData.blackbook}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.blackbook}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.blackbook?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Form.Label>Mileage:</Form.Label>
                            <Form.Group controlId="mileage">
                                <Form.Control
                                    type="text"
                                    name="mileage"
                                    value={tradeData.mileage}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.mileage}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mileage?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="tires" isInvalid={!!errors.tires}>
                                <Row>
                                    <Col>
                                        <Form.Label>Needs Tires:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            name="tires"
                                            value="Yes"
                                            checked={tradeData.tires === 'Yes'}
                                            onChange={handleInputChange}
                                            required
                                            isInvalid={!!errors.tires}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="tires"
                                            value="No"
                                            checked={tradeData.tires === 'No'}
                                            onChange={handleInputChange}
                                            required
                                            isInvalid={!!errors.tires}
                                        />
                                    </Col>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.tires?.message}
                                    </Form.Control.Feedback>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Form.Group controlId="retail" isInvalid={!!errors.retail}>
                                    <Form.Label>Disposition:</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Retail"
                                        id="retail"
                                        name="retail"
                                        value="Retail"
                                        checked={tradeData.retail === 'Retail'}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.retail}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Wholesale"
                                        id="wholesale"
                                        name="retail"
                                        value="Wholesale"
                                        checked={tradeData.retail === 'Wholesale'}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.retail}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.retail?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group controlId="options" isInvalid={!!errors.options}>
                            <Form.Label>Options:</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.options?.twobyfour.message}
                            </Form.Control.Feedback>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="2x4"
                                        id="twobyfour"
                                        name="options.twobyfour"
                                        checked={tradeData.options.twobyfour}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type='checkbox'
                                        label='4x4'
                                        id='fourbyfour'
                                        name='options.fourbyfour'
                                        checked={tradeData.options.fourbyfour}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Quad sts"
                                        id='quadsts'
                                        name="options.quadsts"
                                        checked={tradeData.options.quadsts}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="V6"
                                        id='sixcyl'
                                        name="options.sixcyl"
                                        checked={tradeData.options.sixcyl}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="4 Cyl"
                                        id='fourcyl'
                                        name="options.fourcyl"
                                        checked={tradeData.options.fourcyl}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="3rd Row"
                                        id="thirdrow"
                                        name="options.thirdrow"
                                        checked={tradeData.options.thirdrow}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Rear Air"
                                        id="rearair"
                                        name="options.rearair"
                                        checked={tradeData.options.rearair}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Sunroof"
                                        id="sunroof"
                                        name="options.sunroof"
                                        checked={tradeData.options.sunroof}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Auto"
                                        id="autotrans"
                                        name="options.autotrans"
                                        checked={tradeData.options.autotrans}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="V8"
                                        id="eightcyl"
                                        name="options.eightcyl"
                                        checked={tradeData.options.eightcyl}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        label="Manual"
                                        id="manualtrans"
                                        name="options.manualtrans"
                                        checked={tradeData.options.manualtrans}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="CD Player"
                                        id="cdplayer"
                                        name="options.cdplayer"
                                        checked={tradeData.options.cdplayer}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Leather"
                                        id="leather"
                                        name="options.leather"
                                        checked={tradeData.options.leather}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Painted"
                                        id="painted"
                                        name="options.painted"
                                        checked={tradeData.options.painted}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Salvage Title"
                                        id="salvagetitle"
                                        name="options.salvagetitle"
                                        checked={tradeData.options.salvagetitle}
                                        onChange={handleCheckboxChange}
                                        isInvalid={!!errors.options}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Row>
                    <Form.Group controlId="setby" isInvalid={!!errors.setby}>
                        <Form.Label>Set in by:</Form.Label>
                        <Form.Control
                            as="select"
                            name="setby"
                            value={tradeData.setby}
                            onChange={handleInputChange}
                            isInvalid={!!errors.setby}
                            required
                        >
                            <option value=""></option>
                            <option value="Travis Kunce">Travis Kunce</option>
                            <option value="Brandon Nash">Brandon Nash</option>
                            <option value="Darrin Mills">Darrin Mills</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.setby?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="comments" isInvalid={!!errors.comments}>
                        <Form.Label>Comments:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="comments"
                            value={tradeData.comments}
                            onChange={handleInputChange}
                            isInvalid={!!errors.comments}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.comments?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleTradeSubmit}>
                    Save Trade
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTradeModal;
