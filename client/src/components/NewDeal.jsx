import '../App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { vehicleStateModel } from './Tradesheet';
import AddTradeModal from './AddTradeModal';
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

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setDealData({ ...dealData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        axios
            .post('http://localhost:8000/api/deal', dealData)
            .then((res) => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);
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
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default createDeal;
