import '../App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { vehicleStateModel } from './Tradesheet';
import AddTradeModal from './AddTradeModal';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={dealData.age}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="weOwe">We Owe:</label>
                <input
                    type="text"
                    id="weOwe"
                    name="weOwe"
                    value={dealData.weOwe}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="driverFee">Driver Fee:</label>
                <input
                    type="number"
                    id="driverFee"
                    name="driverFee"
                    value={dealData.driverFee}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="profitAfter">Profit After:</label>
                <input
                    type="number"
                    id="profitAfter"
                    name="profitAfter"
                    value={dealData.profitAfter}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="holdBack">Hold Back:</label>
                <input
                    type="number"
                    id="holdBack"
                    name="holdBack"
                    value={dealData.holdBack}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="financeReserve">Finance Reserve:</label>
                <input
                    type="number"
                    id="financeReserve"
                    name="financeReserve"
                    value={dealData.financeReserve}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="warrantyGap">Warranty Gap:</label>
                <input
                    type="number"
                    id="warrantyGap"
                    name="warrantyGap"
                    value={dealData.warrantyGap}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="idTheftEtch">ID Theft Etch:</label>
                <input
                    type="number"
                    id="idTheftEtch"
                    name="idTheftEtch"
                    value={dealData.idTheftEtch}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="docFee">Doc Fee:</label>
                <input
                    type="number"
                    id="docFee"
                    name="docFee"
                    value={dealData.docFee}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="commission">Commission:</label>
                <input
                    type="number"
                    id="commission"
                    name="commission"
                    value={dealData.commission}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="purchaseType">Purchase Type:</label>
                <input
                    type="text"
                    id="purchaseType"
                    name="purchaseType"
                    value={dealData.purchaseType}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                <label htmlFor="dealManager">Deal Manager:</label>
                <input
                    type="text"
                    id="dealManager"
                    name="dealManager"
                    value={dealData.dealManager}
                    onChange={handleFieldChange}
                />
            </div>
            <button type="button" onClick={handleAddTradeClick}>
                Add Trade
            </button>
            {/* Display trade input modal or form */}
            {isAddingTrade && (
                <AddTradeModal
                    show={isAddingTrade}
                    onHide={() => setIsAddingTrade(false)}
                />
            )}
            <button type="submit">Submit</button>
        </form>
    );
}

export default createDeal;
