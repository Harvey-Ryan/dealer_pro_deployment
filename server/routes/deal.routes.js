
const dealController = require('../controllers/dealController');

module.exports = (app) => {
    app.post('/api/deal', dealController.createDeal);
    app.get('/api/deal', dealController.getDeals);
    app.get('/api/deal/:id', dealController.getDeal);
    app.put('/api/deal/:id', dealController.updateDeal);
    app.delete('/api/deal/:id', dealController.deleteDeal);
};