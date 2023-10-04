

const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    stocknumber: {
        type: String,
        required: [true, 'Stock number is required.'],
        minLength: [3, 'Stock number must be at least 3 characters long.'],
    },
    vin: {
        type: String,
        required: [true, 'VIN is required.'],
        minLength: [17, 'VIN must be at least 17 characters long.'],
    },
    make: {
        type: String,
        required: [true, 'Make is required.']
    },
    model: {
        type: String,
        required: [true, 'Model is required.']
    },
    year: {
        type: Number,
        required: [true, 'Year is required.']
    },
    color: {
        type: String,
        required: [true, 'Color is required.']
    },
    mileage: {
        type: Number,
        required: [true, 'Mileage is required.'],
        minimum: [1, 'Mileage must be at least 1.'],
    },
    bookedat: {
        type: Number,
        required: [true, 'Booked-in value is required.'],
        minimum: [1, 'Booked-in value must be at least 1.'],
    },
    blackbook: {
        type: Number,
        required: [true, 'Black-book value is required.'],
        minimum: [1, 'Black-book value must be at least 1.'],
    },
    retail: {
        type: String,
        required: [true, 'Is this a Retail or Wholesale unit?'],
    },
    tires: {
        type: String,
        required: [true, 'Does it need tires?'],
    },
    setby: {
        type: String,
        required: [true, 'Desking Manager required.'],
    },
    comments: {
        type: String,
        required: [true, 'Comments are required.'],
        maxLength: [255, 'Comments must be less than 256 characters long.'],
    },
    //TODO: TRIGGER ONLY 1 TRUE VALUE IN THE FORM / DB
    mechanical: {
        type: String,
        required: [true, 'You must choose Mechanical condition.']
    },
    appearance: {
        type: String,
        required: [true, 'You must choose Appearance condition.']
    },
    // TODO: CONVERT OBJECTS TO STRINGS IN THE DATABASE
    carfax: {
        report: {
            type: Boolean,
            default: false,
        },
        damage: {
            type: Boolean,
            default: false,
        },
        branded: {
            type: Boolean,
            default: false,
        },
        // required: [true, 'Please select applicable CarFax fields.'],
    },
    options: {
            twobyfour: {
                type: Boolean,
                default: false,
            },
            fourbyfour: {
                type: Boolean,
                default: false,
            },
            quadsts: {
                type: Boolean,
                default: false,
            },
            sixcyl: {
                type: Boolean,
                default: false,
            },
            fourcyl: {
                type: Boolean,
                default: false,
            },
            thirdrow: {
                type: Boolean,
                default: false,
            },
            rearair: {
                type: Boolean,
                default: false,
            },
            sunroof: {
                type: Boolean,
                default: false,
            },
            autotrans: {
                type: Boolean,
                default: false,
            },
            eightcyl: {
                type: Boolean,
                default: false,
            },
            manualtrans: {
                type: Boolean,
                default: false,
            },
            cdplayer: {
                type: Boolean,
                default: false,
            },
            leather: {
                type: Boolean,
                default: false,
            },
            painted: {
                type: Boolean,
                default: false,
            },
            salvagetitle: {
                type: Boolean,
                default: false,
            },
            // TEMPORARY FOR TESTING
        },
        storename: {
                type: String,
        },
}, { timestamps: true });

const Vehicle = mongoose.model('dealer_pro', VehicleSchema);

module.exports = Vehicle;