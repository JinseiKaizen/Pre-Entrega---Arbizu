const productos = require("../productServices/productServices.js")
class Products {

    async get(req, res) {
        const limit = Number(req.query.limit)
        const readProduct = await productos.getProductsFromFile()
        const productLimit = readProduct.slice(0, limit)

        if (!limit) {
            return res.json(readProduct)
        }

        res.json(await productLimit)
    }

    async getPid(req, res) {
        let pid = Number(req.params.pid)
        if (isNaN(pid)) return res.send(`El id no es un número`)
        res.json(await productos.getProductById(pid))
    }

    async create(req, res) {
        const product = req.body;

        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
            res.send('Faltan campos obligatorios en el producto. No se puede agregar el producto.')
        }
        else {
            res.json(await productos.addProduct(product));
        }
    }

    async update(req, res) {
        let pid = Number(req.params.pid)
        const fields = req.body;
        if (isNaN(pid)) return res.send(`El id no es un número`)
        res.json(await productos.updateProduct(pid, fields));
    }

    async delete(req, res) {
        let pid = Number(req.params.pid)
        res.json(await productos.deleteProduct(pid));
    }

}

module.exports = new Products();