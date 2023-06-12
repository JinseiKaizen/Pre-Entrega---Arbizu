const fs = require("fs")

class ProductServices {
    constructor() {
        this.path = "./src/data/products.json"
    }

    async addProduct(product) {
        const { code } = product
        const products = await this.getProductsFromFile()

        const existingProduct = products.find(product => product.code === code)
        if (existingProduct) {
            return(`Ya existe un producto con el código "${code}". No se puede agregar el producto.`)
        }

        const newProduct = {
            id: this.getNextId(products),
            ...product
        }
        products.push(newProduct)
        this.saveProductsToFile(products)
        console.log(`Se agregó correctamente el producto con el código "${code}".`)
    }


    async getProducts() {
        return await this.getProductsFromFile()
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile()
            const product = products.find(product => product.id === id)
            if (!product) {
                return (`No se encontró ningún producto con el id ${id}.`)
            }
            return product
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProductsFromFile()
            const index = products.findIndex(product => product.id === id)
            if (index !== -1) {
                const updatedProduct = {
                    ...products[index],
                    ...updatedFields
                }

                if (updatedFields.hasOwnProperty('id')) {
                    updatedProduct.id = products[index].id;
                    return("No se puede modificar el ID del producto");
                }

                products[index] = updatedProduct;
                this.saveProductsToFile(products)
                
                console.log("Se actualizó el producto")
            }
            else {
                console.log(`No se encontró ningún producto con el id ${id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProductsFromFile()
            const index = products.findIndex(product => product.id === id)
            if (index === -1) {
                console.log(`No se encontró ningún producto con el id ${id}`)
            }
            else {
                products.splice(index, 1)
                this.saveProductsToFile(products)
                console.log(`Se eliminó correctamente el producto con el id ${id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async saveProductsToFile(products) {
        try {
            const data = JSON.stringify(products, null, 2)
            await fs.promises.writeFile(this.path, data)
        } catch (error) {
            console.log(error);
        }
    }

    getNextId(products) {
        if (products.length === 0) {
            return 1
        }
        const maxId = Math.max(...products.map(product => product.id))
        return maxId + 1
    }
}

module.exports = new ProductServices();