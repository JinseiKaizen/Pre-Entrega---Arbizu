const carts = require("../cartsServices/cartsServices.js")

class Carts {
    
    async get(req, res){
        let cid = Number(req.params.cid)
        if (isNaN(cid)) return res.send(`El id no es un número`)
        res.json(await carts.getCartById(cid))
    }
    
    async create(req, res){
        res.json(await carts.createCart())
    }

    async add(req, res){
        let cid = Number(req.params.cid)
        let pid = Number(req.params.pid)

        if (isNaN(cid) || isNaN(pid)) {
            return res.send('El id no es un número');
        }

        res.json(await carts.addProductToCart(cid,pid))
    }

}

module.exports = new Carts(); 