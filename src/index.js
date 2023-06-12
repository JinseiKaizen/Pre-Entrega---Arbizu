const express = require("express")
const routes = require("./routes")

const PORT = 8080;

class Server {
    constructor(){
        this.app = express();
        this.settings();
        this.routes();
    }

    settings(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
    }

    routes(){
        routes(this.app);
    }

    listen(){
        this.app.listen(PORT, () => { console.log(`Server running on: http://localhost:${PORT}`) });
    }
}

module.exports = new Server();