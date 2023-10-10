
const vehicleController = require('../controllers/vehicle.controllers.js');

module.exports = (app) => {
    app.post('/api/vehicle', vehicleController.createVehicle);
    app.get('/api/vehicle', vehicleController.getVehicles);
    app.get('/api/vehicle/:id', vehicleController.getVehicle);
    app.put('/api/vehicle/:id', vehicleController.updateVehicle);
    app.delete('/api/vehicle/:id', vehicleController.deleteVehicle);
};