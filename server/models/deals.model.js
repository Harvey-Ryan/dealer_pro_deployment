

const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    stocknumber: {

    },
    newUsed: {
        type: String,
        required: [true, 'New (N) or Used (U) required.'],
        minLength: [1, 'Cannot be blank.'],
        maxLength: [1, 'Please use N or U.'],
    },
    // TODO: CLEAN UP DESCRIPTION
    description: {
        type: String,
        required: [true, 'Description is required.'],
        maxLength: [255, 'Description must be less than 256 characters long.'],
    },
    stocknumber: {
        type: String,
        required: [true, 'Stock number is required.'],
        minLength: [3, 'Stock number must be at least 3 characters long.'],
    },
    miles: {
        type: Number,
        required: [true, 'Miles is required.'],
        minimum: [1, 'Miles must be at least 1.'],
    },
    salesPerson: {
        type: String,
        required: [true, 'Sales Person is required.']
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
        minimum: [1, 'Age must be at least 1.'],
    },
    weOwe: {
        type: String,
    },
    driverFee: {
        type: Number,
    },
    profitAfter: {
        type: Number,
        required: [true, 'Profit is required.'],
        minimum: [1, 'Profit must be at least 1.'],
    },
    holdBack: {
        type: Number,
    },
    financeReserve:{
        type: Number,
    },
    warrantyGap: {
        type: Number,
    },
    idTheftEtch: {
        type: Number,
    },
    docFee:{
        type: Number,
    },
    commission: {
        type: Number,
        required: [true, 'Commission is required.'],
        minimum: [1, 'Commission must be at least 1.'],
    },
    tradeMY: {
        type: Number,
    },
    tradeMake: {
        type: String,
    },
    tradeModel: {
        type: String,
    },
    tradeMiles: {
        type: Number,
    },
    purchaseType: {
        type: String,
        required: [true, 'Purchase Type is required.'],
        minLength: [3, 'Purchase Type must be at least 3 characters long.'],
    },
    dealManager: {
        type: String,
        required: [true, 'Deal Manager is required.'],
        minLength: [3, 'Deal Manager must be at least 3 characters long.'],
    },

}, { timestamps: true });

const Deal = mongoose.model('dealer_pro', dealSchema);

module.exports = Deal;