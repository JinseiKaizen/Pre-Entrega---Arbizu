const { Router } = require("express")
const productsController = require("./productsController/productsController.js")

module.exports = app => {
    const router = new Router();

    app.use('/api/products', router);
    router.get('/', productsController.get);
    router.get('/:pid', productsController.getPid);
    router.post('/', productsController.create);
    router.put('/:pid', productsController.update);
    router.delete('/:pid', productsController.delete);
};