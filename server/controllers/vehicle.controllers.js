
const Vehicle = require('../models/vehicle.model');

//Create a Vehicle
const createVehicle = (req, res) => {
    Vehicle.create(req.body)
        .then(newVehicle => { res.json(newVehicle) })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

//Retrieve all Vehicles from the database.
const getVehicles = (req, res) => {
    Vehicle.find()
        .then(vehicles => { res.json(vehicles); })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

//Retrieve a single Vehicle with an id
const getVehicle = (req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => {
            if (!vehicle) {
                res.status(404).json({
                    message: "Vehicle not found with id " + req.params.id
                });
            }
            res.json(vehicle);
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

//Update a Vehicle with an id
const updateVehicle = (req, res) => {
    const { id } = req.params;
    const {
        stocknumber,
        vin,
        make,
        model,
        year,
        color,
        mileage,
        bookedat,
        blackbook,
        retail,
        tires,
        setby,
        comments,
        mechanical,
        appearance,
        carfax,
        options,
        storename
    } = req.body;

    const errors = {};
    if (!stocknumber || stocknumber.length < 3) {
        errors.stocknumber = "Stock number is required.";
    }
    if (!vin || vin.length < 17) {
        errors.vin = "17-Digit VIN is required.";
    }
    if (!make || make.length < 1) {
        errors.make = "Make is required.";
    }
    if (!model || model.length < 1) {
        errors.model = "Model is required.";
    }
    if (!year || year.length < 4) {
        errors.year = "Year is required.";
    }
    if (!color || color.length < 3) {
        errors.color = "Color is required.";
    }
    if (!mileage || mileage.length < 1) {
        errors.mileage = "Mileage is required.";
    }
    if (!bookedat || bookedat.length < 1) {
        errors.bookedat = "Booked-in value is required.";
    }
    if (!blackbook || blackbook.length < 1) {
        errors.blackbook = "Blackbook value is required.";
    }
    //TODO: CHECK THESE VALIDATIONS
    if (retail == null) {
        errors.retail = "Retail disposition is required.";
    }
    //TODO: CHECK THESE VALIDATIONS
    if (tires == null) {
        errors.tires = "Does vehicle need tires?";
    }
    if (!setby || setby.length < 1) {
        errors.setby = "Desking Manager required.";
    }
    if (!comments || comments.length < 1 || comments.length > 255) {
        errors.comments = "Comments are required.";
    }
    //TODO: CHECK THESE VALIDATIONS
    if (!mechanical) {
        errors.mechanical = "Mechanical condition is required.";
    }
    //TODO: CHECK THESE VALIDATIONS
    if (!appearance) {
        errors.appearance = "Appearance condition is required.";
    }
    //TODO: CHECK THESE VALIDATIONS
    if (!carfax) {
        errors.carfax = "Carfax fields required.";
    }
    //TODO: CHECK THESE VALIDATIONS
    if (!options) {
        errors.options = "Options are required.";
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    Vehicle.findByIdAndUpdate(id, {
        stocknumber,
        vin,
        make,
        model,
        year,
        color,
        mileage,
        bookedat,
        blackbook,
        retail,
        tires,
        setby,
        comments,
        mechanical,
        appearance,
        carfax,
        options,
        storename
    }, { new: true })
        .then((vehicle) => {
            if (!vehicle) {
                res.status(404).json({
                    message: "Vehicle not found with id " + id
                });
            }
            res.json(vehicle);
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

//Delete a Vehicle with an id
const deleteVehicle = (req, res) => {
    const { id } = req.params;

    Vehicle.findByIdAndRemove(id)
        .then(vehicle => {
            if (!vehicle) {
                res.status(404).json({
                    message: "Vehicle not found with id " + id
                });
            } else {
                res.json({ message: "Vehicle deleted successfully!" });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
};