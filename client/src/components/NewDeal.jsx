import '../App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { vehicleStateModel } from './Tradesheet';
import AddTradeModal from './AddTradeModal';
<<<<<<< HEAD
import { Form, Button, Card, Col, Row, Table } from 'react-bootstrap';


const createDeal = () => {
    const [dealData, setDealData] = useState({
        description: '',
        stocknumber: '',
        miles: 0,
        newUsed: '',
        salesPerson: '',
        age: 0,
        weOwe: 0,
        driverFee: 0,
        profitAfter: 0,
        holdBack: 0,
        financeReserve: 0,
        warrantyGap: 0,
        idTheftEtch: 0,
        docFee: 0,
        commission: 0,
        tradeInVehicles: [],
        purchaseType: '',
        dealManager: '',
        comments: '',
    });

    const [errors, setErrors] = useState({
        description: null,
        stocknumber: null,
        miles: null,
        newUsed: null,
        salesPerson: null,
        age: null,
        weOwe: null,
        driverFee: null,
        profitAfter: null,
        holdBack: null,
        financeReserve: null,
        warrantyGap: null,
        idTheftEtch: null,
        docFee: null,
        commission: null,
        purchaseType: null,
        dealManager: null,
        comments: null,
    });
    const navigate = useNavigate();
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedTradeIns, setSelectedTradeIns] = useState([]);
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [isAddingTrade, setIsAddingTrade] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tradeInVehicles, setTradeInVehicles] = useState([]);


    const handleAddTradeClick = () => {
        console.log('Add Trade button clicked');
        setIsAddingTrade(true);
        setSelectedVehicle(null);
        setShowTradeModal(true);
    };
    // Fetch Trade Vehicles for display
    const fetchTradeInVehicle = async (tradeId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/vehicle/${tradeId}`);
            return response.data; // Assuming the response contains trade-in vehicle data
        } catch (error) {
            console.error('Error fetching trade-in vehicle:', error);
            return null;
        }
    };

    // Fetch Trade In Vehicles for display on Data updates
    useEffect(() => {
        const fetchTradeInData = async () => {
            const vehicleData = await Promise.all(dealData.tradeInVehicles.map((tradeId) => fetchTradeInVehicle(tradeId)));
            setTradeInVehicles(vehicleData.filter(Boolean)); // Filter out null responses
        };

        fetchTradeInData();
    }, [dealData.tradeInVehicles]);

    const calculateTotalProfit = () => {
        const profitAfter = parseFloat(dealData.profitAfter) || 0;
        const holdBack = parseFloat(dealData.holdBack) || 0;
        const financeReserve = parseFloat(dealData.financeReserve) || 0;
        const warrantyGap = parseFloat(dealData.warrantyGap) || 0;
        const idTheftEtch = parseFloat(dealData.idTheftEtch) || 0;
        const docFee = parseFloat(dealData.docFee) || 0;

        return profitAfter + holdBack + financeReserve + warrantyGap + idTheftEtch + docFee;
    };

    const [totalProfit, setTotalProfit] = useState(calculateTotalProfit());

    useEffect(() => {
        setTotalProfit(calculateTotalProfit());
    }, [
        dealData.profitAfter,
        dealData.holdBack,
        dealData.financeReserve,
        dealData.warrantyGap,
        dealData.idTheftEtch,
        dealData.docFee,
    ]);

=======
import { Form, Button, Card, Col, Row } from 'react-bootstrap';

const createDeal = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [dealData, setDealData] = useState({
        age: '',
        weOwe: '',
        driverFee: '',
        profitAfter: '',
        holdBack: '',
        financeReserve: '',
        warrantyGap: '',
        idTheftEtch: '',
        docFee: '',
        commission: '',
        purchaseType: '',
        dealManager: '',
    });

>>>>>>> 81c86925e5b21a1a7994e3cc7de8d527a8a1f3ed
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setDealData({ ...dealData, [name]: value });
    };

<<<<<<< HEAD
    const removeTradeInVehicle = (indexToRemove) => {
        const updatedTradeInVehicles = dealData.tradeInVehicles.filter((_, index) => index !== indexToRemove);
        setDealData({ ...dealData, tradeInVehicles: updatedTradeInVehicles });
    };

    const handleSelectTrade = (tradeId) => {
        // Store trade vehicle ID
        console.log('TRADE ID:', tradeId);
        const tradeIds = [];
        tradeIds.push(tradeId);
        console.log('HandleSelectTrade tradeIds:', tradeIds);

        setDealData((prevDealData) => ({
            ...prevDealData,
            tradeInVehicles: [...prevDealData.tradeInVehicles, tradeId],
        }));
        console.log('HandleSelectTrade - AFTER setDealData:', dealData);

        setShowTradeModal(false);
    };

    const validateForm = () => {
        const newErrors = {};
        console.log("VALIDATION FORM - DEAL DATA: ", dealData);

        // Implement your validation logic here
        if (!dealData.description) {
            newErrors.description = "Description is required";
        }
        if (!dealData.newUsed) {
            newErrors.newUsed = "New/Used is required";
        }
        if (!dealData.purchaseType) {
            newErrors.purchaseType = "Purchase Type is required";
        }
        if (!dealData.dealManager) {
            newErrors.dealManager = "Deal Manager is required";
        }
        if (!dealData.salesPerson) {
            newErrors.salesPerson = "Sales Person is required";
        }
        if (!dealData.age) {
            newErrors.age = "Age is required";
        }


        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        console.log("HANDLE SUBMIT - DEAL DATA: ", dealData);

        // Validate the form
        const newErrors = validateForm();

        // If there are validation errors, set them and do not submit the form
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            console.log("HANDLE SUBMIT- VALIDATION ERRORS - DEAL DATA: ", dealData);
            return;
        }

        //After validation, send dealData
=======
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
>>>>>>> 81c86925e5b21a1a7994e3cc7de8d527a8a1f3ed
        axios
            .post('http://localhost:8000/api/deal', dealData)
            .then((res) => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);
<<<<<<< HEAD
                // Handle server validation errors
                if (err.response && err.response.data && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };


    return (
        <Card className="w-100 m-auto p-0 mt-5">
            <Card.Header>
                <Card.Title as="h5">Add Deal</Card.Title>
            </Card.Header>
            <Card.Body className="bg-light">
                <Form onSubmit={handleSubmit}>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th className='col-2'>Description</th>
                                <th className='text-center col-md-auto'>New/Used</th>
                                <th className='text-center col-1'>Sales Person</th>
                                <th className='text-center'>Age</th>
                                <th className='text-center'>We Owe</th>
                                <th className='text-center'>Driver Fee</th>
                                <th className='text-center'>Profit After</th>
                                <th className='text-center'>Hold Back</th>
                                <th className='text-center'>Finance Reserve</th>
                                <th className='text-center'>Warranty Gap</th>
                                <th className='text-center'>ID Theft Etch</th>
                                <th className='text-center'>Doc Fee</th>
                                <th className='text-center'>Total Profit {"(Auto)"}</th>
                                <th className='text-center'>Commission</th>
                                <th className='text-center'>Bank</th>
                                <th className='text-center col-1'>Deal Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Form.Group
                                        controlId="description"
                                        isInvalid={!!errors.description}
                                    >
                                        <Form.Control
                                            type="text"
                                            name="description"
                                            placeholder="Year Make Model"
                                            value={dealData.description}
                                            onChange={handleFieldChange}
                                            isInvalid={!!errors.description}
                                            required
                                        />
                                        {errors.description && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                    <Form.Group
                                        controlId="stocknumber"
                                        isInvalid={!!errors.stocknumber}
                                    >
                                        <Form.Control
                                            type="text"
                                            name="stocknumber"
                                            placeholder="Stock Number"
                                            value={dealData.stocknumber}
                                            onChange={handleFieldChange}
                                            isInvalid={!!errors.stocknumber}
                                            required
                                        />
                                        {errors.stocknumber && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.stocknumber}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId="miles" isInvalid={!!errors.miles}>
                                        <Row>
                                            <Col className="col col-sm-2">
                                                <Form.Label>Miles:</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    name="miles"
                                                    placeholder="Miles"
                                                    value={dealData.miles}
                                                    onChange={handleFieldChange}
                                                    isInvalid={!!errors.miles}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        {errors.miles && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.miles}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group
                                        controlId="newUsed"
                                        isInvalid={!!errors.newUsed}
                                    >
                                        <Form.Control
                                            as="select"
                                            name="newUsed"
                                            value={dealData.newUsed}
                                            onChange={handleFieldChange}
                                            isInvalid={!!errors.newUsed}
                                            required
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="New">New</option>
                                            <option value="Used">Used</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.newUsed?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group
                                        controlId="salesPerson"
                                        isInvalid={!!errors.salesPerson}
                                    >
                                        <Form.Control
                                            as="select"
                                            name="salesPerson"
                                            value={dealData.salesPerson}
                                            onChange={handleFieldChange}
                                            isInvalid={!!errors.salesPerson}
                                            required
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="Kathy S">Kathy S</option>
                                            <option value="Ryan H">Ryan H</option>
                                            <option value="Daniel V">Daniel V</option>
                                            <option value="Chance H">Chance H</option>
                                            <option value="Ann O">Ann O</option>
                                            <option value="Nate D">Nate D</option>
                                            <option value="Chris O">Chris O</option>
                                            <option value="Key S">Key S</option>
                                            <option value="Zack A">Zack A</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.salesPerson?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group
                                        controlId="age"
                                        isInvalid={!!errors.age}
                                    >
                                        <Form.Control
                                            type="number"
                                            name="age"
                                            value={dealData.age}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                            isInvalid={!!errors.age}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.age?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="weOwe">
                                        <Form.Control
                                            type="number"
                                            name="weOwe"
                                            value={dealData.weOwe}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="driverFee">
                                        <Form.Control
                                            type="number"
                                            name="driverFee"
                                            value={dealData.driverFee}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group
                                        controlId="profitAfter"
                                        isInvalid={!!errors.profitAfter}
                                    >
                                        <Form.Control
                                            type="number"
                                            name="profitAfter"
                                            value={dealData.profitAfter}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                            isInvalid={!!errors.profitAfter}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.profitAfter?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="holdBack">
                                        <Form.Control
                                            type="number"
                                            name="holdBack"
                                            value={dealData.holdBack}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="financeReserve">
                                        <Form.Control
                                            type="number"
                                            name="financeReserve"
                                            value={dealData.financeReserve}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="warrantyGap">
                                        <Form.Control
                                            type="number"
                                            name="warrantyGap"
                                            value={dealData.warrantyGap}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="idTheftEtch">
                                        <Form.Control
                                            type="number"
                                            name="idTheftEtch"
                                            value={dealData.idTheftEtch}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="docFee">
                                        <Form.Control
                                            type="number"
                                            name="docFee"
                                            value={dealData.docFee}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="totalProfit">
                                        <Form.Control
                                            type="number"
                                            name="totalProfit"
                                            value={totalProfit}
                                            onChange={handleFieldChange}
                                            readOnly
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="commission">
                                        <Form.Control
                                            type="number"
                                            name="commission"
                                            value={dealData.commission}
                                            onChange={handleFieldChange}
                                            inputMode="numeric"
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group
                                        controlId="purchaseType"
                                        isInvalid={!!errors.purchaseType}
                                    >
                                        <Form.Control
                                            type="text"
                                            name="purchaseType"
                                            value={dealData.purchaseType}
                                            onChange={handleFieldChange}
                                            isInvalid={!!errors.purchaseType}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.purchaseType?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group
                                        controlId="dealManager"
                                        isInvalid={!!errors.dealManager}
                                    >
                                        <Form.Control
                                            as="select"
                                            name="dealManager"
                                            value={dealData.dealManager}
                                            onChange={handleFieldChange}
                                            isInvalid={!!errors.dealManager}
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="Travis Kunce">Travis Kunce</option>
                                            <option value="Brandon Nash">Brandon Nash</option>
                                            <option value="Darrin Mills">Darrin Mills</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dealManager?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Row>
                        <Col>
                            <Form.Group
                                controlId="comments"
                                isInvalid={!!errors.comments}
                            >
                                <Form.Label>Comments:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="comments"
                                    value={dealData.comments}
                                    onChange={handleFieldChange}
                                    isInvalid={!!errors.comments}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.comments?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className='mt-auto justify-content-around d-flex'>
                            {tradeInVehicles.length > 0 ? (
                                tradeInVehicles.map((vehicle, index) => (
                                    <div key={index} className="d-flex justify-content-between">
                                        <h3>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                                        <a href="#" onClick={() => removeTradeInVehicle(index)}>Remove Trade</a>
                                    </div>
                                ))
                            ) : (
                                <p>No trade-in vehicles added.</p>
                            )}
                            <Button variant="primary" type="button" onClick={handleAddTradeClick}>
                                Add Trade
                            </Button>
                            {isAddingTrade && (
                                <AddTradeModal
                                    show={showTradeModal}
                                    onHide={() => setShowTradeModal(false)}
                                    onSelectVehicle={handleSelectTrade}
                                    selectedTradeIns={selectedTradeIns}
                                />
                            )}
                        </Col>
                        <Col className='mt-auto'>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
=======
                setErrors(err.response.data.errors);
            });
    };

    const [isAddingTrade, setIsAddingTrade] = useState(false);

    const handleAddTradeClick = () => {
        setIsAddingTrade(true);
    };

    return (
        <Card className="w-75">
            <Card.Header>
                <Card.Title as="h5">Add Deal</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                    <Form.Group controlId="age" className="mb-3">
                        <Form.Label>Age:</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={dealData.age}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="weOwe" className="mb-3">
                        <Form.Label>We Owe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="weOwe"
                            value={dealData.weOwe}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="driverFee" className="mb-3">
                        <Form.Label>Driver Fee:</Form.Label>
                        <Form.Control
                            type="number"
                            name="driverFee"
                            value={dealData.driverFee}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="profitAfter" className="mb-3">
                        <Form.Label>Profit After:</Form.Label>
                        <Form.Control
                            type="number"
                            name="profitAfter"
                            value={dealData.profitAfter}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="holdBack" className="mb-3">
                        <Form.Label>Hold Back:</Form.Label>
                        <Form.Control
                            type="number"
                            name="holdBack"
                            value={dealData.holdBack}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="financeReserve" className="mb-3">
                        <Form.Label>Finance Reserve:</Form.Label>
                        <Form.Control
                            type="number"
                            name="financeReserve"
                            value={dealData.financeReserve}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="warrantyGap" className="mb-3">
                        <Form.Label>Warranty Gap:</Form.Label>
                        <Form.Control
                            type="number"
                            name="warrantyGap"
                            value={dealData.warrantyGap}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="idTheftEtch" className="mb-3">
                        <Form.Label>ID Theft Etch:</Form.Label>
                        <Form.Control
                            type="number"
                            name="idTheftEtch"
                            value={dealData.idTheftEtch}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="docFee" className="mb-3">
                        <Form.Label>Doc Fee:</Form.Label>
                        <Form.Control
                            type="number"
                            name="docFee"
                            value={dealData.docFee}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="commission" className="mb-3">
                        <Form.Label>Commission:</Form.Label>
                        <Form.Control
                            type="number"
                            name="commission"
                            value={dealData.commission}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="purchaseType" className="mb-3">
                        <Form.Label>Purchase Type:</Form.Label>
                        <Form.Control
                            type="text"
                            name="purchaseType"
                            value={dealData.purchaseType}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="dealManager" className="mb-3">
                        <Form.Label>Deal Manager:</Form.Label>
                        <Form.Control
                            type="text"
                            name="dealManager"
                            value={dealData.dealManager}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Button variant="primary" type="button" onClick={handleAddTradeClick}>
                                Add Trade
                            </Button>
                            {/* Display trade input modal or form */}
                            {isAddingTrade && (
                                <AddTradeModal show={isAddingTrade} onHide={() => setIsAddingTrade(false)} />
                            )}
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                Submit
>>>>>>> 81c86925e5b21a1a7994e3cc7de8d527a8a1f3ed
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default createDeal;
