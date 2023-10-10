

const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    newUsed: {
        type: String,
<<<<<<< HEAD
        required: [true, 'New or Used required.'],
=======
        required: [true, 'New (N) or Used (U) required.'],
        minLength: [1, 'Cannot be blank.'],
        maxLength: [1, 'Please use N or U.'],
>>>>>>> 81c86925e5b21a1a7994e3cc7de8d527a8a1f3ed
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
<<<<<<< HEAD
        type: Number,
=======
        type: String,
>>>>>>> 81c86925e5b21a1a7994e3cc7de8d527a8a1f3ed
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
    financeReserve: {
        type: Number,
    },
    warrantyGap: {
        type: Number,
    },
    idTheftEtch: {
        type: Number,
    },
    docFee: {
        type: Number,
    },
    commission: {
        type: Number,
<<<<<<< HEAD
=======
        required: [true, 'Commission is required.'],
        minimum: [1, 'Commission must be at least 1.'],
>>>>>>> 81c86925e5b21a1a7994e3cc7de8d527a8a1f3ed
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
    tradeInVehicles: [
        {
            type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
            ref: [],
        },
    ],
    comments: {
        type: String,
        required: [true, 'Comments are required.'],
    },

}, { timestamps: true });

dealSchema.path('tradeInVehicles').validate(function (value) {
    // Only validate if the array is not empty
    if (Array.isArray(value) && value.length > 0) {
        return value.every((item) => mongoose.Types.ObjectId.isValid(item));
    }
    return true; // Allow an empty array
}, 'Trade-in vehicles must be valid ObjectIds.');

const Deal = mongoose.model('Deals', dealSchema);
=======
            ref: 'Vehicle',
        },
    ],

}, { timestamps: true });

const Deal = mongoose.model('dealer_pro', dealSchema);
>>>>>>> 81c86925e5b21a1a7994e3cc7de8d527a8a1f3ed

module.exports = Deal;