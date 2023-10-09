
const Deal = require('../models/deals.model');

// Create a Deal
const createDeal = (req, res) => {
    Deal.create(req.body)
        .then(newDeal => { res.json(newDeal) })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

// Retrieve all Deals from the database.
const getDeals = (req, res) => {
    Deal.find()
        .then(deals => { res.json(deals); })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

// Retrieve a single Deal with an id
const getDeal = (req, res) => {
    Deal.findById(req.params.id)
        .then(deal => {
            if (!deal) {
                res.status(404).json({
                    message: "Deal not found with id " + req.params.id
                });
            }
            res.json(deal);
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

// Update a Deal with an id

const updateDeal = (req, res) => {
    const { id } = req.params;
    const {
        stocknumber,
        newUsed,
        description,
        miles,
        salesPerson,
        age,
        weOwe,
        driverFee,
        profitAfter,
        holdBack,
        financeReserve,
        warrantyGap,
        idTheftEtch,
        docFee,
        commission,
        purchaseType,
        dealManager
    } = req.body;

    const errors = {};
    if (!stocknumber || stocknumber.length < 3) {
        errors.stocknumber = "Stock number is required.";
    }
    if (!newUsed || newUsed.length < 1) {
        errors.newUsed = "New Used is required.";
    }
    if (!description || description.length < 1) {
        errors.description = "Description is required.";
    }
    if (!miles || miles.length < 1) {
        errors.miles = "Miles is required.";
    }
    if (!salesPerson || salesPerson.length < 1) {
        errors.salesPerson = "Sales Person is required.";
    }
    if (!age || age.length < 1) {
        errors.age = "Age is required.";
    }
    // if (!weOwe || weOwe.length < 1) {
    //     errors.weOwe = "We Owe is required.";
    // }
    // if (!driverFee || driverFee.length < 1) {
    //     errors.driverFee = "Driver Fee is required.";
    // }
    if (!profitAfter || profitAfter.length < 1) {
        errors.profitAfter = "Profit After is required.";
    }
    if (newUsed === "N" && (!holdBack || holdBack.length < 1)) {
        errors.holdBack = "Hold Back is required.";
    }
    // if (!financeReserve || financeReserve.length < 1) {
    //     errors.financeReserve = "Finance Reserve is required.";
    // }
    // if (!warrantyGap || warrantyGap.length < 1) {
    //     errors.warrantyGap = "Warranty Gap is required.";
    // }
    // if (!idTheftEtch || idTheftEtch.length < 1) {
    //     errors.idTheftEtch = "ID Theft Etch is required.";
    // }
    if (!docFee || docFee.length < 1) {
        errors.docFee = "Doc Fee is required.";
    }
    if (!commission || commission.length < 1) {
        errors.commission = "Commission is required.";
    }
    if (!purchaseType || purchaseType.length < 1) {
        errors.purchaseType = "Purchase Type is required.";
    }
    if (!dealManager || dealManager.length < 1) {
        errors.dealManager = "Deal Manager is required.";
    }

    Deal.findByIdAndUpdate(id, {
        stocknumber,
        newUsed,
        description,
        miles,
        salesPerson,
        age,
        weOwe,
        driverFee,
        profitAfter,
        holdBack,
        financeReserve,
        warrantyGap,
        idTheftEtch,
        docFee,
        commission,
        purchaseType,
        dealManager
    }, { new: true })
        .then(deal => {
            if (!deal) {
                res.status(404).json({
                    message: "Deal not found with id " + id
                });
            }
            res.json(deal);
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

// Delete a Deal with an id
const deleteDeal = (req, res) => {
    const { id } = req.params;

    Deal.findByIdAndRemove(id)
        .then(deal => {
            if (!deal) {
                res.status(404).json({
                    message: "Deal not found with id " + id
                });
            } else {
                res.json({ message: "Deal deleted successfully!" });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

module.exports = {
    createDeal,
    getDeals,
    getDeal,
    updateDeal,
    deleteDeal
};