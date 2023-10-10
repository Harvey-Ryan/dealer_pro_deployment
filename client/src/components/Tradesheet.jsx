import '../App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const vehicleStateModel = {
    vin: '',
    year: '',
    make: '',
    model: '',
    stocknumber: '',
    color: '',
    mileage: '',
    bookedat: '',
    blackbook: '',
    retail: '',
    tires: '',
    setby: '',
    comments: '',
    mechanical: '',
    appearance: '',
    carfax: {
        report: false,
        damage: false,
        branded: false,
    },
    options: {
        twobyfour: false,
        fourbyfour: false,
        quadsts: false,
        sixcyl: false,
        fourcyl: false,
        thirdrow: false,
        rearair: false,
        sunroof: false,
        autotrans: false,
        eightcyl: false,
        manualtrans: false,
        cdplayer: false,
        leather: false,
        painted: false,
        salvagetitle: false,
    },
    storename: 'Frank Fletcher Subaru',
};


const CreateTradesheet = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [vehicle, setVehicle] = useState(vehicleStateModel);

    useEffect(() => {
        console.log('Initial vehicle: ', vehicle);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, } = e.target;

        setVehicle((prevVehicle) => ({
            ...prevVehicle,
            [name]: value,
        }));
    };

    const handleCarfaxChange = (e) => {
        const { name, checked } = e.target;
        const [parentName, childName] = name.split('.');
        setVehicle((prevVehicle) => ({
            ...prevVehicle,
            carfax: {
                ...prevVehicle.carfax,
                [childName]: checked,
            },
        }));
    };

    const handleOptionChange = (e) => {
        const { name, checked } = e.target;
        const [parentName, childName] = name.split('.');

        setVehicle((prevVehicle) => ({
            ...prevVehicle,
            options: {
                ...prevVehicle.options,
                [childName]: checked,
            },
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        axios
            .post('http://localhost:8000/api/vehicle', vehicle)
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard');
            })
            .catch((err) => {
                if (err.response.data.errors && err.response) {
                    setErrors(err.response.data.errors);
                    console.log(err.response.data.errors);
                } else {
                    console.log(err);
                }
            });
    };

    // GET TODAY'S DATE
    const today = new Date();

    // FORMAT DATE
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className='printer d-flex container flex-column'>
            <div className=' d-flex w-100 justify-content-start'>
                <div className='d-flex flex-column'>
                    <h2 className="text-danger whitespace">Frank Fletcher Subaru</h2>
                    <h3 className="whitespace">Trade Sheet</h3>
                    <p className="whitespace">{formattedDate}</p>
                </div>
            </div>
            <form className='d-flex flex-column align-items-center' type="POST" onSubmit={handleSubmit}>
                {errors.vehicle && errors.vehicle.carfax ? (<p className='text-danger'>{errors.vehicle.carfax.message}</p>) : null}
                <div className='form-group d-flex justify-content-around m-2 w-75'>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="report"
                            name="carfax.report"
                            checked={vehicle.carfax.report}
                            onChange={handleCarfaxChange}
                        />
                        <label className="form-check-label" htmlFor="report">Carfax</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="damage"
                            name="carfax.damage"
                            checked={vehicle.carfax.damage}
                            onChange={handleCarfaxChange}
                        />
                        <label className="form-check-label" htmlFor="damage">Damage Reported</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="branded"
                            name="carfax.branded"
                            checked={vehicle.carfax.branded}
                            onChange={handleCarfaxChange}
                        />
                        <label className="form-check-label" htmlFor="branded">Branded Title</label>
                    </div>
                </div>
                <div className='form-group d-flex justify-content-start w-100'>
                    <div className='d-flex row flex-column w-40 mt-4'>
                        {errors.vehicle && errors.vehicle.vin ? (<p className='text-danger'>{errors.vehicle.vin.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center m-1 justify-content-between">
                            <label className='d-flex col-sm-2 col-form-label' htmlFor="vin">VIN: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="vin"
                                    name="vin"
                                    value={vehicle.vin}
                                    placeholder="Enter 17-Digit VIN"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {errors.vehicle && errors.vehicle.make ? (<p className='text-danger'>{errors.vehicle.make.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center m-1 justify-content-between">
                            <label className='d-flex col-sm-2 col-form-label' htmlFor="make">Make: </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Manufacturer"
                                    id="make"
                                    name="make"
                                    value={vehicle.make}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {errors.vehicle && errors.vehicle.model ? (<p className='text-danger'>{errors.vehicle.model.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center m-1 justify-content-between">
                            <label className='d-flex col-sm-2 col-form-label' htmlFor="model">Model: </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Model"
                                    id="model"
                                    name="model"
                                    value={vehicle.model}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {errors.vehicle && errors.vehicle.year ? (<p className='text-danger'>{errors.vehicle.year.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center m-1 justify-content-between">
                            <label className='d-flex col-sm-2 col-form-label' htmlFor="year">Year: </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Model Year"
                                    id="year"
                                    name="year"
                                    value={vehicle.year}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {errors.vehicle && errors.vehicle.color ? (<p className='text-danger'>{errors.vehicle.color.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center m-1 justify-content-between">
                            <label className='d-flex col-sm-2 col-form-label' htmlFor="color">Color: </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Example input"
                                    id="color"
                                    name="color"
                                    value={vehicle.color}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {errors.vehicle && errors.vehicle.stocknumber ? (<p className='text-danger'>{errors.vehicle.stocknumber.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center m-1 justify-content-between">
                            <label className='d-flex col-sm-2 col-form-label' htmlFor="stocknumber">Stock#: </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Example input"
                                    id="stocknumber"
                                    name="stocknumber"
                                    value={vehicle.stocknumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-around w-100 mt-3 p-2'>
                    <div className='d-flex flex-column w-50 p-5'>
                        <h3><u>Mechanical:</u></h3>
                        {errors.vehicle && errors.vehicle.mechanical ? (<p className='text-danger'>{errors.vehicle.mechanical.message}</p>) : null}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="good"
                                name="mechanical"
                                value="Good"
                                checked={vehicle.mechanical === 'Good'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="good">Good</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="fair"
                                value="Fair"
                                name="mechanical"
                                checked={vehicle.mechanical === 'Fair'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="fair">Fair</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="poor"
                                value="Poor"
                                name="mechanical"
                                checked={vehicle.mechanical === 'Poor'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="poor">Poor</label>
                        </div>
                    </div>
                    <div className='d-flex flex-column w-50 p-5'>
                        <h3><u>Appearance:</u></h3>
                        {errors.vehicle && errors.vehicle.appearance ? (<p className='text-danger'>{errors.vehicle.appearance.message}</p>) : null}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="good"
                                value="Good"
                                name="appearance"
                                checked={vehicle.appearance === 'Good'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="good">Good</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                id="fair"
                                value="Fair"
                                name="appearance"
                                checked={vehicle.appearance === 'Fair'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="fair">Fair</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                id="poor"
                                value="Poor"
                                name="appearance"
                                checked={vehicle.appearance === 'Poor'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="poor">Poor</label>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-around w-100 mt-3'>
                    <div className='d-flex row flex-column w-50 mt-4 p-5'>
                        <h3><u>Value:</u></h3>
                        {errors.vehicle && errors.vehicle.bookedat ? (<p className='text-danger'>{errors.vehicle.bookedat.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center justify-content-between">
                            <label className='d-flex col-5 col-form-label justify-content-start' htmlFor="bookedat">Booked-In Ammount: </label>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter booked-in value"
                                    id="bookedat"
                                    name="bookedat"
                                    value={vehicle.bookedat}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {errors.vehicle && errors.vehicle.blackbook ? (<p className='text-danger'>{errors.vehicle.blackbook.message}</p>) : null}
                        <div className="form-group row d-flex align-items-center">
                            <label className='d-flex col-5 col-form-label justify-content-start' htmlFor="blackbook">Black Book: </label>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Black Book Value"
                                    id="blackbook"
                                    name="blackbook"
                                    value={vehicle.blackbook}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex row flex-column w-50 mt-4 p-5'>
                        {errors.vehicle && errors.vehicle.mileage ? (<p className='text-danger'>{errors.vehicle.mileage.message}</p>) : null}
                        <div className='d-flex w-50'>
                            <label htmlFor='mileage' className='h3'><u>Mileage:</u></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mileage"
                                id="mileage"
                                name="mileage"
                                value={vehicle.mileage}
                                onChange={handleInputChange}
                            />
                        </div>
                        {errors.vehicle && errors.vehicle.tires ? (<p className='text-danger'>{errors.vehicle.tires.message}</p>) : null}
                        <div className='d-flex w-50 justify-content-between'>
                            <label htmlFor='tires'>Needs tires:</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="yes"
                                    value="Yes"
                                    name="tires"
                                    checked={vehicle.tires === 'Yes'}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label" htmlFor="yes">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="no"
                                    value="No"
                                    name="tires"
                                    checked={vehicle.tires === 'No'}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label" htmlFor="no">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex mt-5 justify-content-between w-100'>
                    <div className='d-flex flex-column w-50 p-5'>
                        {errors.vehicle && errors.vehicle.retail ? (<p className='text-danger'>{errors.vehicle.retail.message}</p>) : null}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="retail"
                                value="Retail"
                                name="retail"
                                checked={vehicle.retail === 'Retail'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="retail">Retail</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="wholesale"
                                value="Wholesale"
                                name="retail"
                                checked={vehicle.retail === 'Wholesale'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="wholesale">Wholesale</label>
                        </div>
                    </div>
                    {errors.vehicle && errors.vehicle.options ? (<p className='text-danger'>{errors.vehicle.options.message}</p>) : null}
                    <div className='d-flex w-50 p-5'>
                        <div className='d-flex flex-column w-50 p-2'>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="twobyfour"
                                    name="options.twobyfour"
                                    checked={vehicle.options.twobyfour}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="twobyfour">2x4</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="fourbyfour"
                                    name="options.fourbyfour"
                                    checked={vehicle.options.fourbyfour}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="fourbyfour">4x4</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                    type="checkbox"
                                    id="quadsts"
                                    name="options.quadsts"
                                    checked={vehicle.options.quadsts}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="quadsts">Quad STS</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="sixcyl"
                                    name="options.sixcyl"
                                    checked={vehicle.options.sixcyl}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="sixcyl">V6</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="fourcyl"
                                    name="options.fourcyl"
                                    checked={vehicle.options.fourcyl}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="fourcyl">4 Cyl.</label>
                            </div>
                        </div>
                        <div className='d-flex flex-column w-50 p-2'>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="thirdrow"
                                    name="options.thirdrow"
                                    checked={vehicle.options.thirdrow}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="thirdrow">3rd Row</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="rearair"
                                    name="options.rearair"
                                    checked={vehicle.options.rearair}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="rearair">Rear Air</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="sunroof"
                                    name="options.sunroof"
                                    checked={vehicle.options.sunroof}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="sunroof">Sunroof</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="autotrans"
                                    name="options.autotrans"
                                    checked={vehicle.options.autotrans}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="autotrans">Auto</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="eightcyl"
                                    name="options.eightcyl"
                                    checked={vehicle.options.eightcyl}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="eightcyl">V8</label>
                            </div>
                        </div>
                        <div className='d-flex flex-column w-50 p-2'>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="manualtrans"
                                    name="options.manualtrans"
                                    checked={vehicle.options.manualtrans}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="manualtrans">Manual</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="cdplayer"
                                    name="options.cdplayer"
                                    checked={vehicle.options.cdplayer}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="cdplayer">CD</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="leather"
                                    name="options.leather"
                                    checked={vehicle.options.leather}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="leather">Leather</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="painted"
                                    name="options.painted"
                                    checked={vehicle.options.painted}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="painted">Been Painted</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="salvagetitle"
                                    name="options.salvagetitle"
                                    checked={vehicle.options.salvagetitle}
                                    onChange={handleOptionChange}
                                />
                                <label className="form-check-label" htmlFor="salvagetitle">Salvage Title</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-100'>
                    {errors.vehicle && errors.vehicle.comments ? (<p className='text-danger'>{errors.vehicle.comments.message}</p>) : null}
                    <div className='d-flex w-75 p-5'>
                        <label className="form-check-label" htmlFor="comments">Comments:</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            cols="25"
                            id="comments"
                            name="comments"
                            value={vehicle.comments}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.vehicle && errors.vehicle.setby ? (<p className='text-danger'>{errors.vehicle.setby.message}</p>) : null}
                    <div className='d-flex justify-content-start w-25 p-5 align-items-center'>
                        <label htmlFor="setby" className='col'>Set in by:</label>
                        <select
                            id="setby"
                            className="form-control col"
                            name="setby"
                            value={vehicle.setby}
                            onChange={handleInputChange}
                        >
                            <option value="" defaultValue></option>
                            <option value="Travis Kunce">Travis Kunce</option>
                            <option value="Brandon Nash">Brandon Nash</option>
                            <option value="Darrin Mills">Darrin Mills</option>
                        </select>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>
                    Save
                </button>
            </form>
        </div>
    )
};

export default CreateTradesheet;