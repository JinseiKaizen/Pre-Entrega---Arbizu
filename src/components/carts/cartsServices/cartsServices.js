const fs = require("fs")

class CartServices {
    constructor() {
        this.path = "./src/data/carrito.json"
    }


    async createCart() {
        const carts = await this.getCartsFromFile()
        const newCart = {
            id: this.getNextId(carts),
            products: []
        };

        carts.push(newCart);
        await this.saveCartsToFile(carts);
        return ("Carrito creado");
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCartsFromFile();
        const cart = carts.find(cart => cart.id === cid);

        if (!cart) {
            return (`No se encontró ningún carrito con el id ${cid}.`)
        }

        const existingProduct = cart.products.find(product => product.id === pid);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ id: pid, quantity: 1 });
        }

        await this.saveCartsToFile(carts);
    }

    async getCartById(id) {
        try {
            const carts = await this.getCartsFromFile()
            const cart = carts.find(cart => cart.id === id)
            if (!cart) {
                return (`No se encontró ningún carrito con el id ${id}.`)
            }
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async getCartsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async saveCartsToFile(carts) {
        try {
            const data = JSON.stringify(carts, null, 2);
            await fs.promises.writeFile(this.path, data, 'utf8');
        } catch (error) {
            console.log(error);
        }
    }

    getNextId(carts) {
        if (carts.length === 0) {
            return 1
        }
        const maxId = Math.max(...carts.map(cart => cart.id))
        return maxId + 1
    }
}

module.exports = new CartServices();